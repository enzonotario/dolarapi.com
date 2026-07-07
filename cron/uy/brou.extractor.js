import axios from 'axios';
import cheerio from 'cheerio';
import {monedas} from '@/uy/constantes.uy.js';
import {grupo, logError} from '@/log.js';
import tryToCatch from 'try-to-catch';

export default async function () {
    const log = grupo({
        cron: 'cron.uy.js',
        extractor: 'brou.extractor.js',
    });

    const [error, respuesta] = await tryToCatch(obtenerRespuesta);

    if (error) {
        logError(log, error);
        return [];
    }

    if (!respuesta) {
        return [];
    }

    return extraerCotizaciones(respuesta);
}


async function obtenerRespuesta() {
    const buscarPortlet = await axios.get('https://www.brou.com.uy/web/guest/cotizaciones', {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });

    const decodificado = decodeURIComponent(buscarPortlet.data.replace(/\\x/g, '%'));

    const portletPath = decodificado.match(/\/c\/portal\/render_portlet\?p_l_id=\d+&p_p_id=cotizacion\w+&p_p_lifecycle=0&p_t_lifecycle=0/);

    if (!portletPath) {
        logError(grupo({
            cron: 'cron.uy.js',
        }), 'No se encontró el portlet');
        return;
    }

    const portletURL = `https://www.brou.com.uy${portletPath}`;

    const respuesta = await axios.get(portletURL);

    return respuesta.data;
}

function extraerCotizaciones(data) {
    const $ = cheerio.load(data);

    const cotizaciones = [];

    $('tr').each((indice, elemento) => {
        const nombre = $(elemento)
            .find('.moneda')
            .text();

        const compra = $(elemento)
            .find('.valor')
            .eq(0)
            .text();

        const venta = $(elemento)
            .find('.valor')
            .eq(1)
            .text();

        cotizaciones.push({
            nombre: nombre,
            compra: interpretarValorMonetario(compra),
            venta: interpretarValorMonetario(venta),
            fechaActualizacion: interpretarFecha(new Date()),
        });
    });

    return cotizaciones
        .filter((cotizacion) => monedas.find((moneda) => moneda.nombre === cotizacion.nombre))
        .map((cotizacion) => {
            const moneda = monedas.find((moneda) => moneda.nombre === cotizacion.nombre);

            return {
                moneda: moneda.codigo,
                nombre: moneda.nombre,
                compra: cotizacion.compra,
                venta: cotizacion.venta,
                fechaActualizacion: cotizacion.fechaActualizacion,
            };
        });
}

function interpretarValorMonetario(valor) {
    if (valor.trim() === '-' || valor.trim() === '') {
        return null;
    }

    const valorLimpio = valor
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(valorLimpio);
}

function interpretarFecha(fecha) {
    try {
        return new Date(fecha);
    } catch(error) {
        return fecha;
    }
}


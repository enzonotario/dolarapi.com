import axios from 'axios';
import cheerio from 'cheerio';
import {parse} from 'date-fns';
import {es} from 'date-fns/locale';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export default async function () {
    const log = grupo({
        cron: 'cron.bo.js',
        extractor: 'bcb.extractor.js',
    });

    const [error, respuesta] = await tryToCatch(obtenerRespuesta);

    if (error) {
        logError(log, error);
        return null;
    }

    return extraerDolar(respuesta);
}

export function extraerDolar(html) {
    const $ = cheerio.load(html);

    const tipoCambio = extraerTipoCambioUsd($);

    if (!tipoCambio) {
        throw new Error('No se encontró la cotización oficial del dólar (USD)');
    }

    const valor = interpretarValorMonetario(tipoCambio);

    return {
        moneda: 'USD',
        casa: 'oficial',
        nombre: 'Oficial',
        compra: valor,
        venta: valor,
        fechaActualizacion: extraerFechaActualizacion($),
    };
}

function extraerTipoCambioUsd($) {
    let tipoCambio = null;

    $('table.tabla-cotizacion')
        .first()
        .find('tr')
        .each((_, fila) => {
            const codigo = $(fila)
                .find('td.centro')
                .text()
                .trim();

            if (codigo === 'USD') {
                tipoCambio = $(fila)
                    .find('td.numero')
                    .text()
                    .trim();
            }
        });

    return tipoCambio;
}

function extraerFechaActualizacion($) {
    const fechaTexto = $('td strong')
        .first()
        .text()
        .trim();

    if (!fechaTexto) {
        return new Date();
    }

    const fecha = parse(fechaTexto, 'd \'de\' MMMM yyyy', new Date(), {
        locale: es,
    });

    if (Number.isNaN(fecha.getTime())) {
        return new Date();
    }

    return fecha;
}

async function obtenerRespuesta() {
    const respuesta = await axios.get(`https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php`);

    return respuesta.data;
}

function interpretarValorMonetario(valor) {
    return parseFloat(valor.replace(/,/g, ''));
}

import axios from 'axios';
import cheerio from 'cheerio';
import {parse} from 'date-fns';
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


async function obtenerRespuesta() {
    const respuesta = await axios.get(`https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php`);

    return respuesta.data;
}

function extraerDolar(html) {
    const $ = cheerio.load(html);

    const rows = $('tr.listas-fila1, tr.listas-fila2');

    const cotizaciones = [];

    rows.each((index, element) => {
        const columns = $(element).find('td');

        const pais = $(columns[0])
            .text()
            .trim();

        const moneda = $(columns[2])
            .text()
            .trim();

        const tipoCambio = $(columns[3])
            .text()
            .trim();

        cotizaciones.push({
            pais,
            moneda,
            tipoCambio,
        });
    });

    return {
        moneda: 'USD',
        casa: 'oficial',
        nombre: 'Oficial',
        compra: interpretarValorMonetario(cotizaciones
            .find((c) => c.moneda === 'USD.COMPRA').tipoCambio),
        venta: interpretarValorMonetario(cotizaciones
            .find((c) => c.moneda === 'USD.VENTA').tipoCambio),
        fechaActualizacion: new Date(),
    };
}

function interpretarValorMonetario(valor) {
    return parseFloat(valor);
}


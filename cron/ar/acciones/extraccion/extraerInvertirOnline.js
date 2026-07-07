import axios from 'axios';
import cheerio from 'cheerio';
import {parse} from 'date-fns';
import {interpretarDecimalConComa} from '@/utils/numeros.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

const monedas = [{
    codigo: 'USD',
    nombre: 'Dolar Banco Nación',
    simbolo: '$',
}, {
    codigo: 'EUR',
    nombre: 'Euros',
    simbolo: '€',
}, {
    codigo: 'BRL',
    nombre: 'Reales Brasileños',
    simbolo: 'R$',
}, {
    codigo: 'CLP',
    nombre: 'Pesos Chilenos',
    simbolo: '$',
}, {
    codigo: 'UYU',
    nombre: 'Pesos Uruguayos',
    simbolo: '$',
}];

export async function extraerInvertirOnline() {
    const log = grupo({
        cron: 'cron.ar.js',
        extractor: 'extraerInvertirOnline',
    });

    const [error, respuesta] = await tryToCatch(obtenerRespuesta);

    if (error) {
        logError(log, error);
        return [];
    }

    const $ = cheerio.load(respuesta);

    const cotizaciones = [];

    for (const tr of $('table#cotizaciones tbody tr')) {
        const monedaNombre = $(tr)
            .find('td')
            .eq(0)
            .text()
            .trim();

        const moneda = monedas.find(({nombre}) => nombre === monedaNombre);

        const compra = interpretarDecimalConComa($(tr)
            .find('td')
            .eq(1)
            .text()
            .trim());

        const venta = interpretarDecimalConComa($(tr)
            .find('td')
            .eq(2)
            .text()
            .trim());

        const fecha = $(tr)
            .find('td')
            .eq(3)
            .text()
            .trim();

        const fechaParseada = parse(fecha, 'd/M/yyyy H:m:s', new Date());

        cotizaciones.push({
            monedaNombre,
            moneda: moneda ? moneda.codigo : null,
            compra,
            venta,
            fechaActualizacion: fechaParseada,
        });
    }

    return cotizaciones.filter(({moneda}) => moneda);
}

async function obtenerRespuesta() {
    const respuesta = await axios({
        url: 'https://iol.invertironline.com/mercado/cotizaciones/argentina/monedas',
    });

    return respuesta.data;
}


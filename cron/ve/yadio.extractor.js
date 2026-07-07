import axios from 'axios';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export default async function () {
    const log = grupo({
        cron: 'cron.ve.js',
        extractor: 'yadio.extractor.js',
    });

    const [error, respuesta] = await tryToCatch(obtenerRespuesta, 'usd');

    if (error) {
        logError(log, error);
        return null;
    }

    return extraerCotizacionesUsd(respuesta);
}


export async function extraerEurYadio() {
    const log = grupo({
        cron: 'cron.ve.js',
        extractor: 'yadio.extractor.js',
    });

    const [error, respuesta] = await tryToCatch(obtenerRespuesta, 'eur');

    if (error) {
        logError(log, error);
        return null;
    }

    return extraerCotizacionEur(respuesta);
}

async function obtenerRespuesta(moneda) {
    const respuesta = await axios.get(`https://api.yadio.io/exrates/${moneda}`);

    return respuesta.data;
}

function extraerCotizacionesUsd(json) {
    const ves = json.USD ? json.USD.VES : null;

    if (!ves) {
        return [];
    }

    return [{
        fuente: 'paralelo',
        nombre: 'Paralelo',
        compra: null,
        venta: null,
        promedio: ves,
        fechaActualizacion: new Date().toISOString(),
    }];
}

function extraerCotizacionEur(json) {
    const ves = json.EUR ? json.EUR.VES : null;

    if (!ves) {
        return null;
    }

    return {
        fuente: 'euro',
        nombre: 'Euro',
        moneda: 'EUR',
        compra: null,
        venta: null,
        promedio: ves,
        fechaActualizacion: new Date().toISOString(),
    };
}


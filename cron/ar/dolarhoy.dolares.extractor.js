import {dolarHoy, casas} from '@/ar/constantes.ar.js';
import cheerio from 'cheerio';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export async function extraerDolares() {
    const log = grupo({
        cron: 'cron.ar.js',
        extractor: 'dolarhoy.dolares.extractor.js',
    });

    const [errorPagina, pagina] = await tryToCatch(consultarPagina);

    if (errorPagina) {
        logError(log, errorPagina);
        return [];
    }

    const $ = cheerio.load(pagina);

    const resultados = await Promise.all(casas
        .filter((casa) => !casa.calculado)
        .map(async (casa) => {
        const [error, valores] = await tryToCatch(obtenerValoresParaCasa, $, casa);

        if (error) {
            logError(log, error, {
                casa: casa.identificador,
            });
            return null;
        }

        return {
            moneda: 'USD',
            casa: casa.identificador,
            nombre: casa.nombre,
            ...valores,
        };
    }));

    return resultados.filter((resultado) => resultado !== null);
}

async function consultarPagina() {
    const respuesta = await fetch(dolarHoy.baseUrl);

    return await respuesta.text();
}

async function obtenerValoresParaCasa($, casa) {
    const casaConfiguracion = dolarHoy.dolares[casa.identificador];

    switch(casaConfiguracion.extractor) {
    case 'cabecera': {
        return await extraerCabecera($, casaConfiguracion.href, casaConfiguracion.titulo);
    }

    case 'pie': {
        return await extraerPie($, casaConfiguracion.href, casaConfiguracion.titulo);
    }
    default: {
        throw new Error(`Extractor no soportado: ${casaConfiguracion.extractor}`);
    }
    }
}

async function extraerCabecera($, href, titulo) {
    const {
        obtenerValorCompra,
        obtenerValorVenta,
        obtenerFechaActualizacion,
    } = await import('@/ar/extractores/dolarhoy/cabecera.js');

    const compra = await obtenerValorCompra($, href, titulo);
    const venta = await obtenerValorVenta($, href, titulo);
    const fechaActualizacion = obtenerFechaActualizacion($, href);

    return {
        compra,
        venta,
        fechaActualizacion,
    };
}

async function extraerPie($, href, titulo) {
    const {
        obtenerValorCompra,
        obtenerValorVenta,
        obtenerFechaActualizacion,
    } = await import('@/ar/extractores/dolarhoy/pie.js');

    const compra = await obtenerValorCompra($, href, titulo);
    const venta = await obtenerValorVenta($, href, titulo);
    const fechaActualizacion = obtenerFechaActualizacion($, href);

    return {
        compra,
        venta,
        fechaActualizacion,
    };
}


import axios from 'axios';
import cheerio from 'cheerio';
import https from 'https';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export default async function () {
    const log = grupo({
        cron: 'cron.ve.js',
        extractor: 'bcv.extractor.js',
    });

    const [error, html] = await tryToCatch(obtenerHtml);

    if (error) {
        logError(log, error);
        return null;
    }

    return extraerCotizacion(html);
}


export async function extraerEurBcv() {
    const log = grupo({
        cron: 'cron.ve.js',
        extractor: 'bcv.extractor.js',
    });

    const [error, html] = await tryToCatch(obtenerHtml);

    if (error) {
        logError(log, error);
        return null;
    }

    return extraerCotizacionEur(html);
}

async function obtenerHtml() {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    const respuesta = await axios.get('https://www.bcv.org.ve/', {
        httpsAgent,
    });

    return respuesta.data;
}

export function extraerCotizacion(html) {
    const $ = cheerio.load(html);

    var valorUsd = null;
    const fechaBcv = $('.date-display-single')
        .first()
        .attr('content');

    $('span').each((i, el) => {
        const texto = $(el)
            .text()
            .trim();

        if (texto === 'USD') {
            const contenedor = $(el).closest('.recuadrotsmc');
            const strong = contenedor.find('strong');

            if (strong.length > 0) {
                valorUsd = strong
                    .text()
                    .trim();
            }
        }
    });

    if (!valorUsd) {
        $('*').each((i, el) => {
            const texto = $(el).text();

            if (texto.includes('USD') && !valorUsd) {
                const contenedor = $(el).closest('div');
                const strong = contenedor.find('strong');

                if (strong.length > 0) {
                    const posibleValor = strong
                        .text()
                        .trim();

                    if (/^\d/.test(posibleValor)) {
                        valorUsd = posibleValor;
                    }
                }
            }
        });
    }

    if (!valorUsd) {
        return null;
    }

    if (!fechaBcv || esFechaAnteriorAHoy(fechaBcv)) {
        return null;
    }

    const valorNumerico = interpretarValorMonetario(valorUsd);

    if (!valorNumerico) {
        return null;
    }

    return {
        fuente: 'oficial',
        nombre: 'Oficial',
        compra: null,
        venta: null,
        promedio: valorNumerico,
        fechaActualizacion: fechaBcv,
    };
}

export function extraerCotizacionEur(html) {
    const $ = cheerio.load(html);

    var valorEur = null;
    const fechaBcv = $('.date-display-single')
        .first()
        .attr('content');

    $('span').each((i, el) => {
        const texto = $(el)
            .text()
            .trim();

        if (texto === 'EUR') {
            const contenedor = $(el).closest('.recuadrotsmc');
            const strong = contenedor.find('strong');

            if (strong.length > 0) {
                valorEur = strong
                    .text()
                    .trim();
            }
        }
    });

    if (!valorEur) {
        $('*').each((i, el) => {
            const texto = $(el).text();

            if (texto.includes('EUR') && !valorEur) {
                const contenedor = $(el).closest('div');
                const strong = contenedor.find('strong');

                if (strong.length > 0) {
                    const posibleValor = strong
                        .text()
                        .trim();

                    if (/^\d/.test(posibleValor)) {
                        valorEur = posibleValor;
                    }
                }
            }
        });
    }

    if (!valorEur) {
        return null;
    }

    if (!fechaBcv || esFechaAnteriorAHoy(fechaBcv)) {
        return null;
    }

    const valorNumerico = interpretarValorMonetario(valorEur);

    if (!valorNumerico) {
        return null;
    }

    return {
        fuente: 'oficial',
        nombre: 'Euro',
        moneda: 'EUR',
        compra: null,
        venta: null,
        promedio: valorNumerico,
        fechaActualizacion: fechaBcv,
    };
}

function esFechaAnteriorAHoy(contenidoFecha) {
    if (!contenidoFecha)
        return true;

    const fechaISO = contenidoFecha.slice(0, 10);
    const ahora = new Date();

    const hoy = new Date(ahora - 4 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

    return fechaISO < hoy;
}

function interpretarValorMonetario(valor) {
    const limpio = valor
        .replace(/\s/g, '')
        .replace(',', '.');

    return parseFloat(limpio);
}


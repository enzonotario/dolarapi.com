import extraerCotizaciones from '@/uy/brou.extractor.js';
import {escribirRutaRegion} from '@/utils/rutas.js';
import {grupo, logError} from '@/log.js';
import tryToCatch from 'try-to-catch';

export default async function () {
    const log = grupo({
        cron: 'cron.uy.js',
    });

    log.info('Inicio');

    const [error] = await tryToCatch(guardarCotizaciones, log);

    if (error) {
        logError(log, error);
    }

    log.info('Fin');
}


async function guardarCotizaciones(log) {
    const [error, cotizaciones] = await tryToCatch(extraerCotizaciones);

    if (error) {
        logError(log, error, {
            extractor: 'brou.extractor.js',
        });
        return;
    }

    if (!cotizaciones || cotizaciones.length === 0) {
        return;
    }

    cotizaciones.map((cotizacion) => {
        escribirRutaRegion('uy', `/cotizaciones/${cotizacion.moneda.toLowerCase()}`, cotizacion);
    });

    escribirRutaRegion('uy', '/cotizaciones', cotizaciones);
}


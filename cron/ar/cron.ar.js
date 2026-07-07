import {cronDolares} from '@/ar/comandos/dolares.cron.js';
import {cronCotizaciones} from '@/ar/comandos/cotizaciones.cron.js';
import {cronAmbito} from '@/ar/comandos/ambito.cron.js';
import {cronExchanges} from '@/ar/comandos/exchanges.cron.js';
import {grupo, logError} from '@/log.js';
import tryToCatch from 'try-to-catch';

export default async function () {
    const log = grupo({
        cron: 'cron.ar.js',
    });

    log.info('Inicio');

    const [errorDolares] = await tryToCatch(cronDolares);

    if (errorDolares) {
        logError(log, errorDolares, {
            comando: 'cronDolares',
        });
    }

    const [errorCotizaciones] = await tryToCatch(cronCotizaciones);

    if (errorCotizaciones) {
        logError(log, errorCotizaciones, {
            comando: 'cronCotizaciones',
        });
    }

    const [errorAmbito] = await tryToCatch(cronAmbito);

    if (errorAmbito) {
        logError(log, errorAmbito, {
            comando: 'cronAmbito',
        });
    }

    const [errorExchanges] = await tryToCatch(cronExchanges);

    if (errorExchanges) {
        logError(log, errorExchanges, {
            comando: 'cronExchanges',
        });
    }

    log.info('Fin');
}


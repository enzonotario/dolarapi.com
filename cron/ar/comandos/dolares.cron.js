import {consultarDolares} from '@/ar/acciones/consulta/consultarDolares.js';
import {escribirRuta} from '@/utils/rutas.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export async function cronDolares() {
    const log = grupo({
        cron: 'cron.ar.js',
        comando: 'cronDolares',
    });

    const [error, dolares] = await tryToCatch(consultarDolares);

    if (error) {
        logError(log, error);
        return;
    }

    escribirRuta(`/dolares`, dolares);

    dolares.map((dolar) => {
        escribirRuta(`/dolares/${dolar.casa}`, dolar);
    });
}


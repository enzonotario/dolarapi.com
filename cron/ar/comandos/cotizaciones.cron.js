import {consultarCotizaciones} from '@/ar/acciones/consulta/consultarCotizaciones.js';
import {escribirRuta} from '@/utils/rutas.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export async function cronCotizaciones() {
    const log = grupo({
        cron: 'cron.ar.js',
        comando: 'cronCotizaciones',
    });

    const [error, cotizaciones] = await tryToCatch(consultarCotizaciones);

    if (error) {
        logError(log, error);
        return;
    }

    escribirRuta(`/cotizaciones`, cotizaciones);

    cotizaciones.map((cotizacion) => {
        const moneda = cotizacion.moneda.toLowerCase();
        escribirRuta(`/cotizaciones/${moneda}`, cotizacion);
    });
}


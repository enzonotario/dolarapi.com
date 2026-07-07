import {extraerInvertirOnline} from '@/ar/acciones/extraccion/extraerInvertirOnline.js';
import {leerRuta} from '@/utils/rutas.js';
import {unificar} from '@/utils/unificar.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export async function consultarCotizaciones() {
    const log = grupo({
        cron: 'cron.ar.js',
        accion: 'consultarCotizaciones',
    });
    
    const valoresActuales = await leerRuta('/cotizaciones');
    
    const [error, valoresNuevos] = await tryToCatch(extraerInvertirOnline);
    
    if (error) {
        logError(log, error, {
            extractor: 'extraerInvertirOnline',
        });
        return valoresActuales || [];
    }
    
    const cotizaciones = await unificar(valoresActuales, valoresNuevos, 'moneda');
    
    return cotizaciones;
}


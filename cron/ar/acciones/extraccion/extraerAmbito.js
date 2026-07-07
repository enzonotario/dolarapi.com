import {ambito, casasAmbito} from '@/ar/constantes.ar.js';
import {interpretarValorMonetario} from '@/ar/extractores/ambito/interpretarValorMonetario.js';
import {interpretarFecha} from '@/ar/extractores/ambito/interpretarFecha.js';
import {interpretarVariacion} from '@/ar/extractores/ambito/interpretarVariacion.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export async function extraerAmbito() {
    const log = grupo({
        cron: 'cron.ar.js',
        extractor: 'extraerAmbito',
    });

    const resultados = await Promise.all(casasAmbito.map(async (casa) => {
        const [error, valores] = await tryToCatch(obtenerValoresParaCasa, casa);

        if (error) {
            logError(log, error, {
                casa: casa.identificador,
            });
            return null;
        }

        return valores;
    }));

    return resultados.filter((resultado) => resultado !== null);
}

async function obtenerValoresParaCasa(casa) {
    const casaConfiguracion = ambito.dolares[casa.identificador];

    if (!casaConfiguracion) {
        return null;
    }

    const response = await fetch(casaConfiguracion.url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        },
    });

    const json = await response.json();

    const compra = interpretarValorMonetario(json.compra);
    const venta = interpretarValorMonetario(json.venta);
    const fechaActualizacion = interpretarFecha(json.fecha);
    const variacion = interpretarVariacion(json.variacion);

    return {
        moneda: 'USD',
        casa: casa.identificador,
        nombre: casa.nombre,
        compra: casa.permiteCompra ? compra : null,
        venta,
        variacion,
        fechaActualizacion,
    };
}


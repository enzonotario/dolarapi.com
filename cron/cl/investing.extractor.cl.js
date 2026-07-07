import {
    scrapearConFirecrawl,
    debeEjecutarFirecrawlAhora,
} from '@/utils/firecrawl.js';
import {monedas} from '@/cl/constantes.cl.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export default async function () {
    if (!debeEjecutarFirecrawlAhora()) {
        return [];
    }

    const log = grupo({
        cron: 'cron.cl.js',
        extractor: 'investing.extractor.cl.js',
    });

    const resultados = await Promise.all(monedas
        .filter((moneda) => moneda.codigo !== 'CLP')
        .map(async (moneda) => {
        const monedaEnMinusculas = moneda.codigo.toLowerCase();
        const url = `https://es.investing.com/currencies/${monedaEnMinusculas}-clp`;

        const [error, datos] = await tryToCatch(scrapearConFirecrawl, log, {
            url,
            prompt: 'Extrae los valores de compra (bid), venta (ask), cierre anterior (prevClose) y fecha de actualización de la cotización de la moneda.',
            schema: {
                compra: {
                    type: 'number',
                    description: 'Valor de compra (bid) de la moneda',
                },
                venta: {
                    type: 'number',
                    description: 'Valor de venta (ask) de la moneda',
                },
                ultimoCierre: {
                    type: 'number',
                    description: 'Valor de cierre anterior (prevClose) de la moneda',
                },
            },
            required: ['compra', 'venta', 'ultimoCierre'],
        });

        if (error) {
            logError(log, error, {
                moneda: moneda.codigo,
            });
            return null;
        }

        return {
            moneda: moneda.codigo.toUpperCase(),
            nombre: moneda.nombre,
            compra: datos.compra,
            venta: datos.venta,
            ultimoCierre: datos.ultimoCierre,
            fechaActualizacion: new Date().toISOString(),
        };
    }));

    return resultados.filter((resultado) => resultado !== null);
}


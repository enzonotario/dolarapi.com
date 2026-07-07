import {
    scrapearConFirecrawl,
    debeEjecutarFirecrawlAhora,
} from '@/utils/firecrawl.js';
import {grupo, logError} from '@/log.js';
import tryToCatch from 'try-to-catch';

export default async function () {
    if (!debeEjecutarFirecrawlAhora()) {
        return null;
    }

    const log = grupo({
        cron: 'cron.br.js',
        extractor: 'yahoo.extractor.br.js',
        moneda: 'USD',
    });

    const url = 'https://es.investing.com/currencies/usd-brl';

    const [error, datos] = await tryToCatch(scrapearConFirecrawl, log, {
        url,
        prompt: 'Extrae los valores de compra (bid), venta (ask), cierre anterior (prevClose) y fecha de actualización de la cotización de la moneda.',
        schema: {
            compra: {
                type: 'number',
                description: 'Valor de compra (bid) de la moneda',
            },
            venda: {
                type: 'number',
                description: 'Valor de venta (ask) de la moneda',
            },
            fechoAnterior: {
                type: 'number',
                description: 'Valor de cierre anterior (prevClose) de la moneda',
            },
            dataAtualizacao: {
                type: 'string',
                description: 'Fecha y hora de actualización en formato ISO 8601',
            },
        },
        required: [
            'compra',
            'venda',
            'fechoAnterior',
            'dataAtualizacao',
        ],
    });

    if (error) {
        logError(log, error);
        return null;
    }

    function interpretarFecha(fecha) {
        try {
            return new Date(fecha).toISOString();
        } catch(error) {
            return fecha;
        }
    }

    return {
        moeda: 'USD',
        nome: 'Dólar',
        compra: datos.compra,
        venda: datos.venda,
        fechoAnterior: datos.fechoAnterior,
        dataAtualizacao: interpretarFecha(datos.dataAtualizacao),
    };
}


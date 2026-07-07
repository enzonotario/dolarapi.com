import axios from 'axios';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

export default async function () {
    const log = grupo({
        cron: 'cron.bo.js',
        extractor: 'binance-bo.extractor.js',
    });

    const [errorCompra, resCompra] = await tryToCatch(() => obtenerRespuesta('SELL'));

    const [errorVenta, resVenta] = await tryToCatch(() => obtenerRespuesta('BUY'));

    if (errorCompra || errorVenta) {
        logError(log, errorCompra || errorVenta);
        return null;
    }

    const compra = extraerPrecioModa(resCompra);
    const venta = extraerPrecioModa(resVenta);

    return {
        moneda: 'USD',
        casa: 'binance',
        nombre: 'Binance',
        compra,
        venta,
        fechaActualizacion: new Date(),
    };
}


async function obtenerRespuesta(tradeType) {
    const respuesta = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
        fiat: 'BOB',
        page: 1,
        rows: 10,
        tradeType,
        asset: 'USDT',
        countries: [],
        proMerchantAds: false,
        shieldMerchantAds: false,
        filterType: 'all',
        periods: [],
        additionalKycVerifyFilter: 0,
        publisherType: null,
        payTypes: [],
        classifies: ['mass', 'profession', 'fiat_trade'],
    });

    return respuesta.data;
}

function extraerPrecioModa(json) {
    if (!json || !json.data || !json.data.length) {
        return null;
    }

    const precios = json.data.map((cotizacion) => interpretarValorMonetario(cotizacion.adv.price));

    const frecuencia = precios.reduce((acc, val) => {
        acc[val] = acc[val] ? acc[val] + 1 : 1;
        return acc;
    }, {});

    const precioMasRepetido = Object
        .keys(frecuencia)
        .reduce((a, b) => frecuencia[a] > frecuencia[b] ? a : b);

    return interpretarValorMonetario(precioMasRepetido);
}

function interpretarValorMonetario(valor) {
    return parseFloat(valor);
}


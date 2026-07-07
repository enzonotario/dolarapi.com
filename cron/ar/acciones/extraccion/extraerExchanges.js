import axios from 'axios';
import cheerio from 'cheerio';
import {parse} from 'date-fns';
import {collect} from 'collect.js';
import {grupo, logError} from '@/log.js';
import tryToCatch from 'try-to-catch';

export async function extraerExchanges() {
    const cotizaciones = await obtenerCotizaciones();

    return cotizaciones.map((cotizacion) => ({
        ...cotizacion,
        fechaActualizacion: new Date(),
    }));
}

async function obtenerCotizaciones() {
    const maps = {
        belo: consultarBelo,
        fiwind: consultarFiwind,
        dolarapp: consultarDolarApp,
        satoshitango: consultarSatoshiTango,
        prex: consultarPrex,
        lemon: consultarLemon,
        plus: consultarPlus,
        astropay: consultarAstroPay,
    };

    const cotizaciones = [];

    for (const [exchange, fn] of Object.entries(maps)) {
        const log = grupo({
            cron: 'cron.ar.js',
            accion: 'extraerExchanges',
            exchange,
        });

        const [error, data] = await tryToCatch(fn);

        if (error) {
            logError(log, error);
        } else {
            cotizaciones.push(...data);
        }
    }

    return cotizaciones;
}

async function consultarBelo() {
    const respuesta = await axios({
        url: 'https://api.belo.app/public/price',
    });

    return respuesta.data.map((cotizacion) => {
        const [parBase, parMoneda] = cotizacion.pairCode.split('/');

        const moneda = parMoneda.startsWith('USD') ? 'USD' : parMoneda;
        const criptomoneda = parMoneda.startsWith('USD') ? parMoneda : null;

        const monedaBase = parBase.startsWith('USD') ? 'USD' : parBase;
        const criptomonedaBase = parBase.startsWith('USD') ? parBase : null;

        return {
            exchange: 'belo',
            par: [monedaBase, moneda],
            parCriptomoneda: [criptomonedaBase, criptomoneda],
            compra: Number(cotizacion.ask),
            venta: Number(cotizacion.bid),
        };
    });
}

async function consultarFiwind() {
    const respuesta = await axios({
        url: 'https://api.fiwind.io/v1.0/payments/pix/prices',
    });

    const brlToUsdt = respuesta.data.find((cotizacion) => cotizacion.symbol === 'BRLUSDT');

    const brlToArs = respuesta.data.find((cotizacion) => cotizacion.symbol === 'BRLARS');

    return [{
        exchange: 'fiwind',
        par: ['BRL', 'USD'],
        parCriptomoneda: ['USDT', null],
        compra: Number(brlToUsdt.buy),
        venta: Number(brlToUsdt.sell),
    }, {
        exchange: 'fiwind',
        par: ['BRL', 'ARS'],
        compra: Number(brlToArs.buy),
        venta: Number(brlToArs.sell),
    }];
}

async function consultarDolarApp() {
    const respuestaUSD = await axios({
        url: 'https://api.dolarapp.com/v1/tickers?currencies=ARS',
    });

    const respuestaBRL = await axios({
        url: 'https://api.dolarapp.com/v1/tickers?currencies=BRL',
    });

    const cotizacionUSD = respuestaUSD.data.find((cotizacion) => cotizacion.book === 'usdc_ars');

    const compraUSD = Number(cotizacionUSD.ask);
    const ventaUSD = Number(cotizacionUSD.bid);

    const cotizacionBRL = respuestaBRL.data.find((cotizacion) => cotizacion.book === 'usdc_brl');

    const compraBRL = Number(cotizacionBRL.ask);
    const ventaBRL = Number(cotizacionBRL.bid);
    const fxRate = compraUSD / (ventaBRL / 1.0038);

    return [{
        exchange: 'dolarapp',
        par: ['USD', 'ARS'],
        parCriptomoneda: [
            cotizacionUSD.book
                .split('_')[0]
                .toUpperCase(),
            null,
        ],
        compra: compraUSD,
        venta: ventaUSD,
    }, {
        exchange: 'dolarapp',
        par: ['BRL', 'ARS'],
        compra: fxRate,
        venta: null,
    }];
}

async function consultarSatoshiTango() {
    const respuesta = await axios({
        url: 'https://api.satoshitango.com/v3/qr/ticker',
    });

    return respuesta.data.data.tickers.map((cotizacion) => {
        const [parBase, parMoneda] = cotizacion.pair.split('/');

        const monedaBase = parBase.startsWith('USD') ? 'USD' : parBase;
        const moneda = parMoneda.startsWith('USD') ? 'USD' : parMoneda;

        return {
            exchange: 'satoshitango',
            par: [monedaBase, moneda],
            parCriptomoneda: [
                parBase.startsWith('USD') ? parBase : null,
                parMoneda.startsWith('USD') ? parMoneda : null,
            ],
            compra: Number(cotizacion.rate),
            venta: null,
        };
    });
}

async function consultarPrex() {
    const respuesta = await axios({
        url: 'https://api.prexcard.com.ar/v1/partners/pix-webs/quotes',
        headers: {
            'API-Key': import.meta.env.VITE_PREX_API_KEY,
        },
    });

    return respuesta
        .data
        .quotes
        .filter((cotizacion) => cotizacion.symbol === 'BRLUSD' || cotizacion.symbol === 'BRLARS')
        .map((cotizacion) => {
            const [monedaBase, moneda] = cotizacion.symbol === 'BRLUSD' ? ['USD', 'BRL'] : ['BRL', 'ARS'];

            return {
                exchange: 'prex',
                par: [monedaBase, moneda],
                compra: Number(cotizacion.buy),
                venta: null,
            };
        });
}

async function consultarLemon() {
    const respuesta = await axios({
        url: 'https://api.lemoncash.com.ar/api/v1/pix-payments/external-info',
    });

    return respuesta.data.pix_exchange_rates.map((cotizacion) => {
        const monedaBase = cotizacion.base_currency;
        const moneda = cotizacion.quote_currency;

        return {
            exchange: 'lemon',
            par: [monedaBase, moneda],
            compra: Number(cotizacion.applied_price),
            venta: null,
        };
    });
}

async function consultarPlus() {
    const respuesta = await axios({
        url: 'https://api.plus.com.ar/external/remittance/pix/cotization',
        headers: {
            Plusauthclient: 'comparapix',
            Plusauthkey: import.meta.env.VITE_PLUS_AUTH_KEY,
        },
    });

    return [{
        exchange: 'plus',
        par: ['USD', 'BRL'],
        parCriptomoneda: ['USDT', null],
        compra: Number(respuesta.data.USDT_BRL),
        venta: null,
    }, {
        exchange: 'plus',
        par: ['BRL', 'ARS'],
        compra: Number(respuesta.data.ARS_BRL),
        venta: null,
    }];
}

async function consultarAstroPay() {
    const respuesta = await axios({
        url: 'https://partners-api.astropay.com/v1/partners/pix/exchanges',
        headers: {
            Authorization: `Basic ${import.meta.env.VITE_ASTROPAY_AUTH}`,
        },
    });

    return respuesta.data.data.map((cotizacion) => {
        return {
            exchange: 'astropay',
            par: [cotizacion.to, cotizacion.from],
            compra: Number(cotizacion.exchange),
            venta: null,
        };
    });
}


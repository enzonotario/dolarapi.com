function _optionalChain(ops) {
    let lastAccessLHS = undefined;
    let value = ops[0];
    let i = 1;

    while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];

        i += 2;

        if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
            return undefined;
        }

        if (op === 'access' || op === 'optionalAccess') {
            lastAccessLHS = value;
            value = fn(value);
        } else if (op === 'call' || op === 'optionalCall') {
            value = fn((...args) => value.call(lastAccessLHS, ...args));
            lastAccessLHS = undefined;
        }
    }

    return value;
}

export const fuentesComunes = {
    dolarHoy: '[DolarHoy](https://dolarhoy.com/)',
    ambito: '[Ámbito Financiero](https://www.ambito.com/contenidos/dolar.html)',
    bnaAmbito: '[Ámbito Financiero](https://www.ambito.com/contenidos/dolar.html)',
    invertirOnline: '[InvertirOnline](https://iol.invertironline.com/mercado/cotizaciones/argentina/monedas)',
    bcv: '[BCV](https://www.bcv.org.ve/)',
    yadio: '[Yadio](https://api.yadio.io/)',
    investing: '[Investing.com](https://es.investing.com/)',
    superfinanciera: '[Superintendencia Financiera de Colombia](https://www.superfinanciera.gov.co/)',
    banxico: '[Banxico](https://www.banxico.org.mx/)',
    bcb: '[Banco Central de Bolivia](https://www.bcb.gob.bo/)',
    binanceP2p: '[Binance P2P](https://p2p.binance.com/)',
    brou: '[BROU](https://www.brou.com.uy/web/guest/cotizaciones)',
};

export const fuentesPorExchange = {
    belo: '[Belo](https://www.belo.app/)',
    fiwind: '[Fiwind](https://www.fiwind.io/)',
    dolarapp: '[DolarApp](https://dolarapp.com/)',
    satoshitango: '[Satoshi Tango](https://www.satoshitango.com/)',
    prex: '[Prex](https://www.prexcard.com/)',
    lemon: '[Lemon Cash](https://www.lemon.me/)',
    plus: '[Plus](https://www.plus.com.ar/)',
    astropay: '[AstroPay](https://www.astropay.com/)',
};

export const fuentesExchangesListado = Object.values(fuentesPorExchange);

export const fuentesPorRegion = {
    ar: {
        'get-dolares': [fuentesComunes.dolarHoy, fuentesComunes.bnaAmbito],
        'get-dolar-oficial': [fuentesComunes.bnaAmbito],
        'get-dolar-blue': [fuentesComunes.dolarHoy],
        'get-dolar-bolsa': [fuentesComunes.dolarHoy],
        'get-dolar-contadoconliqui': [fuentesComunes.dolarHoy],
        'get-dolar-tarjeta': [fuentesComunes.bnaAmbito],
        'get-dolar-mayorista': [fuentesComunes.ambito],
        'get-dolar-cripto': [fuentesComunes.dolarHoy],
        'get-ambito-dolares': [fuentesComunes.ambito],
        'get-ambito-dolar-oficial': [fuentesComunes.ambito],
        'get-ambito-dolar-bna': [fuentesComunes.bnaAmbito],
        'get-ambito-dolar-blue': [fuentesComunes.ambito],
        'get-ambito-dolar-bolsa': [fuentesComunes.ambito],
        'get-ambito-dolar-contadoconliqui': [fuentesComunes.ambito],
        'get-ambito-dolar-tarjeta': [fuentesComunes.ambito],
        'get-ambito-dolar-mayorista': [fuentesComunes.ambito],
        'get-ambito-dolar-cripto': [fuentesComunes.ambito],
        'get-cotizaciones': [fuentesComunes.invertirOnline],
        'get-cotizacion-eur': [fuentesComunes.invertirOnline],
        'get-cotizacion-brl': [fuentesComunes.invertirOnline],
        'get-cotizacion-clp': [fuentesComunes.invertirOnline],
        'get-cotizacion-uyu': [fuentesComunes.invertirOnline],
    },
    ve: {
        'get-dolares': [fuentesComunes.bcv, fuentesComunes.yadio],
        'get-dolar-oficial': [fuentesComunes.bcv],
        'get-dolar-paralelo': [fuentesComunes.yadio],
        'get-cotizaciones': [fuentesComunes.bcv],
        'get-euros': [fuentesComunes.bcv, fuentesComunes.yadio],
        'get-euro-oficial': [fuentesComunes.bcv],
        'get-euro-paralelo': [fuentesComunes.yadio],
        'get-historicos-dolares': [fuentesComunes.bcv, fuentesComunes.yadio],
        'get-historicos-dolar-oficial': [fuentesComunes.bcv],
        'get-historicos-dolar-paralelo': [fuentesComunes.yadio],
        'get-historicos-dolares-fecha': [fuentesComunes.bcv, fuentesComunes.yadio],
        'get-historicos-dolar-oficial-fecha': [fuentesComunes.bcv],
        'get-historicos-dolar-paralelo-fecha': [fuentesComunes.yadio],
        'get-historicos-euros': [fuentesComunes.bcv, fuentesComunes.yadio],
        'get-historicos-euro-oficial': [fuentesComunes.bcv],
        'get-historicos-euro-paralelo': [fuentesComunes.yadio],
        'get-historicos-euros-fecha': [fuentesComunes.bcv, fuentesComunes.yadio],
        'get-historicos-euro-oficial-fecha': [fuentesComunes.bcv],
        'get-historicos-euro-paralelo-fecha': [fuentesComunes.yadio],
    },
    cl: {
        'get-cotizaciones': [fuentesComunes.investing],
        'get-usd-clp': [fuentesComunes.investing],
        'get-eur-clp': [fuentesComunes.investing],
        'get-brl-clp': [fuentesComunes.investing],
        'get-ars-clp': [fuentesComunes.investing],
        'get-uyu-clp': [fuentesComunes.investing],
    },
    co: {
        'get-cotizaciones': [fuentesComunes.investing],
        'get-usd-cop': [fuentesComunes.investing],
        'get-trm': [fuentesComunes.superfinanciera],
        'get-eur-cop': [fuentesComunes.investing],
        'get-brl-cop': [fuentesComunes.investing],
        'get-mxn-cop': [fuentesComunes.investing],
        'get-clp-cop': [fuentesComunes.investing],
        'get-pen-cop': [fuentesComunes.investing],
        'get-ars-cop': [fuentesComunes.investing],
    },
    br: {
        'get-cotacoes': [fuentesComunes.investing],
        'get-usd-brl': [fuentesComunes.investing],
        'get-eur-brl': [fuentesComunes.investing],
        'get-ars-brl': [fuentesComunes.investing],
        'get-clp-brl': [fuentesComunes.investing],
        'get-uyu-brl': [fuentesComunes.investing],
        'get-status': [fuentesComunes.investing],
    },
    mx: {
        'get-cotizaciones': [fuentesComunes.banxico],
        'get-usd-mxn': [fuentesComunes.banxico],
    },
    bo: {
        'get-dolar-oficial': [fuentesComunes.bcb],
        'get-dolar-binance': [fuentesComunes.binanceP2p],
    },
    uy: {
        'get-cotizaciones': [fuentesComunes.brou],
        'get-usd-uyu': [fuentesComunes.brou],
        'get-eur-uyu': [fuentesComunes.brou],
        'get-ars-uyu': [fuentesComunes.brou],
        'get-brl-uyu': [fuentesComunes.brou],
        'get-chf-uyu': [fuentesComunes.brou],
        'get-gbp-uyu': [fuentesComunes.brou],
        'get-pyg-uyu': [fuentesComunes.brou],
        'get-ui-uyu': [fuentesComunes.brou],
        'get-xau-uyu': [fuentesComunes.brou],
    },
};

export const rutasOpenapiPorRegion = {
    ar: '../../docs/public/openapi.json',
    ve: '../../docs/public/venezuela/openapi.json',
    cl: '../../docs/public/chile/openapi.json',
    co: '../../docs/public/colombia/openapi.json',
    br: '../../docs/public/brasil/openapi.json',
    mx: '../../docs/public/mexico/openapi.json',
    bo: '../../docs/public/bolivia/openapi.json',
    uy: '../../docs/public/uruguay/openapi.json',
};

export function fuentesParaExchanges(exchangeIds) {
    return exchangeIds
        .map((id) => fuentesPorExchange[id])
        .filter(Boolean)
        .filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);
}

export function aplicarFuentesASpec(spec, fuentes) {
    Object
        .values(spec.paths)
        .forEach((pathItem) => {
            const operation = pathItem.get;

            if (!_optionalChain([operation, 'optionalAccess', (_) => _.operationId]))
                return;

            const sources = fuentes[operation.operationId];

            if (_optionalChain([sources, 'optionalAccess', (_2) => _2.length]) > 0) {
                operation['x-data-source'] = sources;
            }
        });

    return spec;
}


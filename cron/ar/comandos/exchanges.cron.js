import { collect } from 'collect.js'
import tryToCatch from 'try-to-catch'
import { extraerExchanges } from '@/ar/acciones/extraccion/extraerExchanges.js'
import { grupo, logError } from '@/log.js'
import { escribirRuta } from '@/utils/rutas.js'

export async function cronExchanges() {
  const log = grupo({
    cron: 'cron.ar.js',
    comando: 'cronExchanges',
  })

  const rutas = []

  rutas.push(generarExchanges())

  const [error, rutasMonedas] = await tryToCatch(generarExchangesMonedas)

  if (error) {
    logError(log, error)
  }
  else {
    rutas.push(rutasMonedas)
  }

  console.tabla(rutas)

  return rutas
}

function generarExchanges() {
  const exchanges = [{
    id: 'belo',
    nombre: 'Belo',
    logo: 'https://icons.com.ar/icons/cripto/belo.svg',
  }, {
    id: 'fiwind',
    nombre: 'Fiwind',
    logo: 'https://icons.com.ar/icons/cripto/fiwind.svg',
  }, {
    id: 'dolarapp',
    nombre: 'DolarApp',
    logo: 'https://icons.com.ar/icons/cripto/dolar-app.svg',
  }, {
    id: 'satoshitango',
    nombre: 'Satoshi Tango',
    logo: 'https://icons.com.ar/icons/cripto/satoshi-tango.svg',
  }, {
    id: 'prex',
    nombre: 'Prex',
    logo: 'https://icons.com.ar/icons/bancos-apps/prex.svg',
  }, {
    id: 'lemon',
    nombre: 'Lemon',
    logo: 'https://icons.com.ar/icons/cripto/lemon.svg',
  }, {
    id: 'plus',
    nombre: 'Plus',
    logo: 'https://uokihdagbfiaicipggkz.supabase.co/storage/v1/object/public/exchanges/plus.jpeg',
  }, {
    id: 'astropay',
    nombre: 'AstroPay',
    logo: 'https://uokihdagbfiaicipggkz.supabase.co/storage/v1/object/public/exchanges/astropay-white-bg.svg?t=2025-01-10T15%3A48%3A11.973Z',
  }]

  escribirRuta('/exchanges', exchanges)

  return {
    ruta: '/exchanges',
    cantidad: exchanges.length,
  }
}

async function generarExchangesMonedas() {
  const cotizaciones = await extraerExchanges()

  console.tabla(cotizaciones)

  const rutas = {}

  function agregarRuta(ruta, valor) {
    rutas[ruta] = [...(rutas[ruta] || []), valor]

    return rutas
  }

  collect(cotizaciones).map((cotizacion) => {
    const {
      exchange,
      par,
      parCriptomoneda,
      compra,
      venta,
    } = cotizacion

    const [monedaBase, moneda] = par
    const [criptomonedaBase, criptomoneda] = parCriptomoneda || []

    const valor = {
      exchange,
      moneda,
      monedaBase,
      ...(criptomoneda || criptomonedaBase
        ? {
            criptomoneda,
            criptomonedaBase,
          }
        : {}),
      compra,
      venta,
    }

    agregarRuta(`/exchanges/${exchange}/${monedaBase.toLowerCase()}`, valor)

    agregarRuta(`/exchanges/monedas/${moneda.toLowerCase()}/${monedaBase.toLowerCase()}`, {
      exchange,
      moneda: monedaBase,
      monedaBase: moneda,
      ...(criptomoneda || criptomonedaBase
        ? {
            criptomoneda: criptomonedaBase,
            criptomonedaBase: criptomoneda,
          }
        : {}),
      compra: compra ? 1 / compra : null,
      venta: venta ? 1 / venta : null,
    })

    agregarRuta(`/exchanges/monedas/${monedaBase.toLowerCase()}/${moneda.toLowerCase()}`, valor)
  })

  for (const [ruta, valor] of Object.entries(rutas)) {
    escribirRuta(ruta, valor)
  }

  return Object
    .entries(rutas)
    .map(([ruta, valor]) => ({
      ruta,
      cantidad: valor.length,
    }))
}

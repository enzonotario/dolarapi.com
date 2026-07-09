import cheerio from 'cheerio'
import tryToCatch from 'try-to-catch'
import { casas, dolarHoy } from '@/ar/constantes.ar.js'
import { grupo, logError } from '@/log.js'

export async function extraerDolares() {
  const log = grupo({
    cron: 'cron.ar.js',
    extractor: 'extraerDolares',
  })

  const [errorPagina, pagina] = await tryToCatch(consultarPagina)

  if (errorPagina) {
    logError(log, errorPagina)
    return []
  }

  const $ = cheerio.load(pagina)

  const resultados = await Promise.all(casas
    .filter(casa => !casa.calculado)
    .map(async (casa) => {
      const [error, valores] = await tryToCatch(obtenerValoresParaCasa, $, casa)

      if (error) {
        logError(log, error, {
          casa: casa.identificador,
        })
        return null
      }

      return valores
    }))

  return resultados.filter(resultado => resultado !== null)
}

async function consultarPagina() {
  const respuesta = await fetch(dolarHoy.baseUrl)

  return await respuesta.text()
}

async function obtenerValoresParaCasa($, casa) {
  const casaConfiguracion = dolarHoy.dolares[casa.identificador]

  const {
    obtenerValorCompra,
    obtenerValorVenta,
    obtenerFechaActualizacion,
  } = await import(`../../extractores/dolarhoy/${casaConfiguracion.extractor}.js`)

  const compra = await obtenerValorCompra($, casaConfiguracion.href, casaConfiguracion.titulo)

  const venta = await obtenerValorVenta($, casaConfiguracion.href, casaConfiguracion.titulo)

  const fechaActualizacion = obtenerFechaActualizacion($)

  return {
    moneda: 'USD',
    casa: casa.identificador,
    nombre: casa.nombre,
    compra,
    venta,
    fechaActualizacion,
  }
}

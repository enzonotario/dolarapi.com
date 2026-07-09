import cheerio from 'cheerio'
import { parse } from 'date-fns'
import tryToCatch from 'try-to-catch'
import { grupo, logError } from '@/log.js'

const monedasSoportadas = [{
  nombre: 'Dolar U.S.A',
  codigo: 'USD',
}]

async function consultarPagina() {
  const respuesta = await fetch('https://www.bna.com.ar/Personas')

  return await respuesta.text()
}

function interpretarValorMonetario(valor) {
  return Number.parseFloat(valor
    .trim()
    .replace(',', '.'))
}

function extraerFechaActualizacion($) {
  const fechaCotizacion = $('th.fechaCot')
    .first()
    .text()

  const horaActualizacionText = $('div.legal')
    .first()
    .text()

  const match = horaActualizacionText.match(/Hora Actualización: (\d{2}:\d{2})/)

  let horaActualizacion

  if (match) {
    horaActualizacion = match[1]
  }

  return parse(`${fechaCotizacion} ${horaActualizacion}`, 'dd/MM/yyyy HH:mm', new Date())
}

export async function extraerCotizaciones() {
  const log = grupo({
    cron: 'cron.ar.js',
    extractor: 'bna.extractor.js',
  })

  const [error, pagina] = await tryToCatch(consultarPagina)

  if (error) {
    logError(log, error)
    return []
  }

  if (!pagina) {
    return []
  }

  const $ = cheerio.load(pagina)

  const cotizaciones = []

  const fechaActualizacion = extraerFechaActualizacion($)

  $('table.cotizacion:first tbody tr').each((i, fila) => {
    const nombre = $(fila)
      .find('td.tit')
      .text()
      .trim()

    const compra = interpretarValorMonetario($(fila)
      .find('td:nth-child(2)')
      .text())

    const venta = interpretarValorMonetario($(fila)
      .find('td:nth-child(3)')
      .text())

    cotizaciones.push({
      nombre,
      compra,
      venta,
      fechaActualizacion,
    })
  })

  return cotizaciones
    .filter(cotizacion => monedasSoportadas.some(monedaSoportada => monedaSoportada.nombre === cotizacion.nombre))
    .map(cotizacion => ({
      moneda: monedasSoportadas.find(monedaSoportada => monedaSoportada.nombre === cotizacion.nombre).codigo,
      nombre: 'Oficial',
      casa: 'oficial',
      compra: cotizacion.compra,
      venta: cotizacion.venta,
      fechaActualizacion,
    }))
}

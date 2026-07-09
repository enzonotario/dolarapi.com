import axios from 'axios'
import cheerio from 'cheerio'
import { grupo, logError } from '@/log.js'

export default async function () {
  const log = grupo({
    cron: 'cron.co.js',
    extractor: 'trm.extractor.co.js',
  })

  try {
    const url = 'https://www.superfinanciera.gov.co/CargaDriver/index.jsp'

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    const $ = cheerio.load(response.data)

    const valorTexto = $('table tbody tr td')
      .eq(2)
      .text()
      .trim()

    const vigenciaTexto = $('table tbody tr td')
      .eq(3)
      .text()
      .trim()

    const valor = interpretarValorMonetario(valorTexto)
    const fechaActualizacion = interpretarFecha(vigenciaTexto)

    if (!valor) {
      throw new Error('No se pudo extraer el valor de la TRM')
    }

    return {
      unidad: 'COP',
      nombre: 'TRM',
      valor,
      fechaActualizacion,
    }
  }
  catch (error) {
    logError(log, error)
    throw error
  }
}

function interpretarValorMonetario(valor) {
  if (!valor) {
    return null
  }

  const valorLimpio = valor
    .replace(/[^\d,.-]/g, '')
    .replace(',', '')

  return Number.parseFloat(valorLimpio)
}

function interpretarFecha(fechaTexto) {
  if (!fechaTexto) {
    return new Date().toISOString()
  }

  const meses = {
    ene: 0,
    feb: 1,
    mar: 2,
    abr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dic: 11,
  }

  const partes = fechaTexto.split('-')

  if (partes.length === 3) {
    const dia = Number(partes[0])
    const mesTexto = partes[1].toLowerCase()
    const año = Number(partes[2])

    if (meses[mesTexto] !== null && !isNaN(dia) && !isNaN(año)) {
      const fecha = new Date(año, meses[mesTexto], dia)
      return fecha.toISOString()
    }
  }

  try {
    return new Date(fechaTexto).toISOString()
  }
  catch (error) {
    return new Date().toISOString()
  }
}

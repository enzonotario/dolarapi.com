import axios from 'axios'
import { parse } from 'date-fns'
import tryToCatch from 'try-to-catch'
import { grupo, logError } from '@/log.js'

const series = {
  fix: 'SF43718',
  compra: 'SF43787',
  venta: 'SF43784',
}

export default async function () {
  const log = grupo({
    cron: 'cron.mx.js',
    extractor: 'banxico.extractor.js',
  })

  const [error, respuesta] = await tryToCatch(obtenerRespuesta)

  if (error) {
    logError(log, error)
    return null
  }

  return extraerDolar(respuesta)
}

async function obtenerRespuesta() {
  const respuesta = await axios.get(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${series.fix},${series.compra},${series.venta}/datos/oportuno`, {
    headers: {
      'Bmx-Token': import.meta.env.VITE_BANXICO_TOKEN,
      'Accept': 'application/json',
    },
  })

  return respuesta.data
}

function extraerDolar(json) {
  const dolar = {
    moneda: 'USD',
    nombre: 'Dólar',
    compra: 0,
    venta: 0,
    fix: 0,
    fechaActualizacion: interpretarFecha(json.bmx.series[0].datos[0].fecha),
  }

  json.bmx.series.forEach((serie) => {
    const { idSerie, datos } = serie

    if (idSerie === series.fix) {
      dolar.fix = interpretarValorMonetario(datos[0].dato)
    }

    if (idSerie === series.compra) {
      dolar.compra = interpretarValorMonetario(datos[0].dato)
    }

    if (idSerie === series.venta) {
      dolar.venta = interpretarValorMonetario(datos[0].dato)
    }
  })

  return dolar
}

function interpretarValorMonetario(valor) {
  return Number.parseFloat(valor)
}

function interpretarFecha(fecha) {
  try {
    return parse(fecha, 'dd/MM/yyyy', new Date())
  }
  catch (error) {
    return fecha
  }
}

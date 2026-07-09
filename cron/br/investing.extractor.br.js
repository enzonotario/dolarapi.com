import tryToCatch from 'try-to-catch'
import { monedas } from '@/br/constantes.br.js'
import extraerUsdBrl from '@/br/yahoo.extractor.br.js'
import { grupo, logError } from '@/log.js'
import {
  debeEjecutarFirecrawlAhora,
  scrapearConFirecrawl,
} from '@/utils/firecrawl.js'

export default async function () {
  const cotizaciones = []

  for (const moneda of monedas.filter(moneda => moneda.codigo !== 'BRL')) {
    const log = grupo({
      cron: 'cron.br.js',
      extractor: 'investing.extractor.br.js',
      moneda: moneda.codigo,
    })

    if (moneda.codigo === 'USD') {
      const [error, cotizacion] = await tryToCatch(extraerUsdBrl)

      if (error) {
        logError(log, error)
      }
      else if (cotizacion) {
        cotizaciones.push(cotizacion)
      }
      else {
        log.warn('No se pudo extraer cotización USD')
      }
    }
    else {
      if (!debeEjecutarFirecrawlAhora()) {
        continue
      }

      const monedaEnMinusculas = moneda.codigo.toLowerCase()
      const url = `https://es.investing.com/currencies/${monedaEnMinusculas}-brl`

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
        },
        required: ['compra', 'venda', 'fechoAnterior'],
      })

      if (error) {
        logError(log, error)
      }
      else if (datos) {
        cotizaciones.push({
          moeda: moneda.codigo.toUpperCase(),
          nome: moneda.nombre,
          compra: datos.compra,
          venda: datos.venda,
          fechoAnterior: datos.fechoAnterior,
          dataAtualizacao: new Date().toISOString(),
        })
      }
      else {
        log.warn(`No se pudo extraer cotización ${moneda.codigo}`)
      }
    }
  }

  return cotizaciones
}

import fs from 'node:fs'
import {
  fuentesExchangesListado,
  fuentesParaExchanges,
} from './fuentes.js'

function loadJSON(path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
}

const baseSpec = {
  openapi: '3.0.0',
  servers: [{
    url: 'https://dolarapi.com',
    description: 'Producción',
  }],
  paths: {},
}

export function init() {
  const openapi = Object.assign({}, baseSpec)

  const exchanges = JSON.parse(fs.readFileSync('datos/v1/exchanges/index.json'))

  openapi.paths['/v1/exchanges'] = {
    get: {
      'summary': 'Listado de exchanges',
      'operationId': 'get-exchanges',
      'description': 'Listado de exchanges.',
      'tags': ['Exchanges'],
      'x-data-source': fuentesExchangesListado,
      'responses': {
        200: {
          description: 'Listado de exchanges',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      enum: exchanges.map(({ id }) => id),
                    },
                    nombre: {
                      type: 'string',
                    },
                    logo: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }

  const monedasBase = fs.readdirSync('datos/v1/exchanges/monedas')

  for (const monedaBase of monedasBase) {
    const monedas = fs.readdirSync(`datos/v1/exchanges/monedas/${monedaBase}`)

    for (const moneda of monedas) {
      if (!fs.existsSync(`datos/v1/exchanges/monedas/${monedaBase}/${moneda}/index.json`)) {
        continue
      }

      const json = JSON.parse(fs.readFileSync(`datos/v1/exchanges/monedas/${monedaBase}/${moneda}/index.json`))

      // obtener valores unicos de la propiedad `exchange`
      const exchanges = json
        .map(({ exchange }) => exchange)
        .filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice)
        .map(exchange => exchange)

      openapi.paths[`/v1/exchanges/monedas/${monedaBase}/${moneda}`] = {
        get: {
          'summary': `${monedaBase.toUpperCase()}/${moneda.toUpperCase()}`,
          'operationId': `get-exchange-moneda-${monedaBase.toLowerCase()}-${moneda.toLowerCase()}`,
          'description': `Cotizaciones de ${monedaBase.toUpperCase()} a ${moneda.toUpperCase()}.`,
          'tags': [`${monedaBase.toUpperCase()}`],
          'x-data-source': fuentesParaExchanges(exchanges),
          'responses': {
            200: {
              description: 'Cotizaciones',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        exchange: {
                          type: 'string',
                          enum: exchanges,
                        },
                        compra: {
                          type: 'number',
                        },
                        venta: {
                          type: 'number',
                        },
                        moneda: {
                          type: 'string',
                          enum: [`${moneda.toUpperCase()}`],
                        },
                        monedaBase: {
                          type: 'string',
                          enum: [`${monedaBase.toUpperCase()}`],
                        },
                        criptomoneda: {
                          type: 'string',
                        },
                        fechaActualizacion: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }
    }
  }

  console.log(openapi)

  fs.mkdirSync('docs/public/exchanges', {
    recursive: true,
  })

  fs.writeFileSync(`docs/public/exchanges/openapi.json`, JSON.stringify(openapi, null, 2))
}

try {
  init()
}
catch (error) {
  console.error(error)
}

import { logError } from '@/log.js'

const FIRECRAWL_API_URL = `${import.meta.env.VITE_FIRECRAWL_BASE_URL}/v2/scrape`
const FIRECRAWL_API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY

const HORA_MAÑANA_UTC = 12
const HORA_TARDE_UTC = 20

export function debeEjecutarFirecrawlAhora() {
  const hora = new Date().getUTCHours()
  return hora === HORA_MAÑANA_UTC || hora === HORA_TARDE_UTC
}

export async function scrapearConFirecrawl(log, configuracion) {
  const {
    url,
    prompt,
    schema,
    required,
  } = configuracion

  try {
    const body = {
      url,
      onlyMainContent: true,
      maxAge: 0,
      formats: ['markdown', {
        type: 'json',
        prompt,
        schema: {
          type: 'object',
          required: required || [],
          properties: schema || {},
        },
      }],
    }

    log.info('Iniciando solicitud a Firecrawl', {
      url,
      firecrawlApiUrl: FIRECRAWL_API_URL,
    })

    const respuesta = await fetch(FIRECRAWL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    if (!respuesta.ok) {
      const respuestaTexto = await respuesta.text()

      log.error('Respuesta no OK de Firecrawl', {
        status: respuesta.status,
        statusText: respuesta.statusText,
        url,
        firecrawlApiUrl: FIRECRAWL_API_URL,
        respuestaBody: respuestaTexto,
        requestBody: body,
      })
      throw new Error(`Error en la solicitud a Firecrawl: ${respuesta.status} ${respuesta.statusText}. URL: ${url}`)
    }

    const datos = await respuesta.json()

    if (!datos.success) {
      log.error('Firecrawl retornó success=false', {
        url,
        datos,
        requestBody: body,
      })
      throw new Error(`Firecrawl retornó success=false para URL: ${url}`)
    }

    if (!datos.data || !datos.data.json) {
      log.error('Datos inválidos de Firecrawl: falta data.json', {
        url,
        datos,
        requestBody: body,
        tieneData: !!datos.data,
        tieneJson: !!(datos.data && datos.data.json),
      })
      throw new Error(`Error en la respuesta de Firecrawl: falta data.json para URL: ${url}`)
    }

    log.info('Solicitud a Firecrawl exitosa', {
      url,
      tieneDatos: datos && datos.data && datos.data.json !== null,
    })

    return datos.data.json
  }
  catch (error) {
    logError(log, error)
    log.error('Error al scrapear con Firecrawl', {
      url: configuracion.url,
      errorMessage: error.message,
      errorName: error.name,
      errorStack: error.stack,
      firecrawlApiUrl: FIRECRAWL_API_URL,
      configuracion: {
        url: configuracion.url,
        tienePrompt: !!configuracion.prompt,
        tieneSchema: !!configuracion.schema,
        required: configuracion.required,
      },
    })
    throw error
  }
}

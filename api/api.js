import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { timing } from 'hono/timing'
import { qstash } from '@/intermediarios/qstash.intermediario.js'

export const app = new Hono()

app.use('*', cors())

app.use('*', timing())

app.use('/cron/*', qstash())

async function dispararCron(token, region) {
  const acciones = await (await fetch('https://api.github.com/repos/enzonotario/esjs-dolar-api/actions/workflows', {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })).json()

  const cron = acciones.workflows.find(w => w.name === 'CRON')

  const cuerpo = {
    ref: 'main',
  }

  if (region) {
    cuerpo.inputs = {
      region,
    }
  }

  await fetch(`https://api.github.com/repos/enzonotario/esjs-dolar-api/actions/workflows/${cron.id}/dispatches`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(cuerpo),
  })
}

app.post('/cron/', async (c) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN

  await dispararCron(token, null)

  return c.json({
    estado: 'Correcto',
  })
})

const VALID_REGIONS = ['bo', 'br', 'cl', 'co', 'mx', 'uy', 'v1', 've']

app.post('/cron/:region', async (c) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const region = c.req.param('region')

  if (!VALID_REGIONS.includes(region)) {
    return c.json({ estado: 'Error', mensaje: 'Región inválida' }, 400)
  }

  await dispararCron(token, region)

  return c.json({
    estado: 'Correcto',
    region,
  })
})

export default app

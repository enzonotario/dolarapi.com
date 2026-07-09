import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'

const raiz = dirname('../')

execSync(`mkdir -p ${join(raiz, 'dist/static/ar/v1')} && cp -r ${join(raiz, 'datos/v1/*')} ${join(raiz, 'dist/static/ar/v1')}`)

const regiones = [
  'cl',
  've',
  'uy',
  'mx',
  'bo',
  'br',
  'co',
]

regiones.forEach((region) => {
  execSync(`mkdir -p ${join(raiz, `dist/static/${region}/v1`)} && cp -r ${join(raiz, `datos/${region}/v1/*`)} ${join(raiz, `dist/static/${region}/v1`)}`)
})

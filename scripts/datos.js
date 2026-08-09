import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const staticDir = join(raiz, 'dist/static')
const docsDir = join(staticDir, 'docs')

const regionesApi = ['cl', 've', 'uy', 'mx', 'bo', 'br', 'co']

/**
 * Código CF / carpeta en dist/static → slug de docs VitePress.
 * Argentina (host raíz) no usa rewrite /* → index.json; solo /v1/* → /ar/v1/...
 */
const regionesDocs = [
  { code: 'cl', docs: 'chile', host: 'https://cl.dolarapi.com' },
  { code: 've', docs: 'venezuela', host: 'https://ve.dolarapi.com' },
  { code: 'uy', docs: 'uruguay', host: 'https://uy.dolarapi.com' },
  { code: 'mx', docs: 'mexico', host: 'https://mx.dolarapi.com' },
  { code: 'bo', docs: 'bolivia', host: 'https://bo.dolarapi.com' },
  { code: 'br', docs: 'brasil', host: 'https://br.dolarapi.com' },
  { code: 'co', docs: 'colombia', host: 'https://co.dolarapi.com' },
]

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
}

function copyDirContents(from, to) {
  ensureDir(to)
  cpSync(from, to, { recursive: true })
}

/**
 * Cloudflare rewrite en hosts regionales: `/*` → `/{region}/${1}/index.json`.
 * Por eso openapi.json / llms.txt / etc. viven como carpeta + index.json.
 */
function writeRegionRewrittenAsset(regionCode, requestPath, sourceFile) {
  if (!existsSync(sourceFile))
    return false

  const destDir = join(staticDir, regionCode, requestPath)
  ensureDir(destDir)
  cpSync(sourceFile, join(destDir, 'index.json'))
  return true
}

function writeRegionRewrittenText(regionCode, requestPath, contents) {
  const destDir = join(staticDir, regionCode, requestPath)
  ensureDir(destDir)
  writeFileSync(join(destDir, 'index.json'), contents)
}

function copyApiDatos() {
  copyDirContents(join(raiz, 'datos/v1'), join(staticDir, 'ar/v1'))

  for (const region of regionesApi) {
    copyDirContents(join(raiz, `datos/${region}/v1`), join(staticDir, `${region}/v1`))
  }
}

function copyArgentinaRootMeta() {
  const rootFiles = [
    'openapi.json',
    'swagger.json',
    'sitemap.xml',
    'llms.txt',
    'llms-full.txt',
    'favicon.ico',
  ]

  for (const file of rootFiles) {
    const src = join(docsDir, file)
    if (!existsSync(src))
      continue
    cpSync(src, join(staticDir, file))
  }

  writeFileSync(
    join(staticDir, 'robots.txt'),
    [
      'User-agent: *',
      'Allow: /',
      '',
      'Sitemap: https://dolarapi.com/sitemap.xml',
      '',
    ].join('\n'),
  )
}

function regionSitemap({ host, docs }) {
  const urls = [
    `${host}/`,
    `${host}/openapi.json`,
    `https://dolarapi.com/docs/${docs}/`,
  ]

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(loc => `  <url><loc>${loc}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')
}

function regionRobots(host) {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${host}/sitemap.xml`,
    '',
  ].join('\n')
}

function copyRegionMeta() {
  for (const region of regionesDocs) {
    const docsRegionDir = join(docsDir, region.docs)

    writeRegionRewrittenAsset(region.code, 'openapi.json', join(docsRegionDir, 'openapi.json'))
    writeRegionRewrittenAsset(region.code, 'llms.txt', join(docsRegionDir, 'llms.txt'))
    writeRegionRewrittenAsset(region.code, 'llms-full.txt', join(docsRegionDir, 'llms-full.txt'))

    writeRegionRewrittenText(region.code, 'sitemap.xml', regionSitemap(region))
    writeRegionRewrittenText(region.code, 'robots.txt', regionRobots(region.host))
  }
}

function assertDocsBuild() {
  if (!existsSync(join(docsDir, 'openapi.json'))) {
    throw new Error('Falta dist/static/docs/openapi.json. Corré docs:build antes de data:copy.')
  }
}

assertDocsBuild()
copyApiDatos()
copyArgentinaRootMeta()
copyRegionMeta()

console.log('Static API datos + meta (openapi/sitemap/robots/llms) listos en dist/static/')

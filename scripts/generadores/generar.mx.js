import fs from 'node:fs'
import { useOpenapi } from 'vitepress-openapi/client'
import { plantilla } from './plantilla.js'

function loadJSON(path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
}

const spec = loadJSON('../../docs/public/mexico/openapi.json')

const openapi = useOpenapi({
  spec,
})

export function init() {
  return Object
    .keys(spec.paths)
    .map((path) => {
      const { operationId } = spec.paths[path].get

      const markdown = generateMarkdown(operationId)

      fs.writeFileSync(`docs/mexico/operations/${operationId}.md`, markdown)
    })
}

function generateMarkdown(operationId) {
  const operation = openapi.getOperation(operationId)

  const markdown = `---
aside: false
outline: false
title: ${operation.summary}
head:
  - [
    'meta',
    {
      name: 'description',
      content: 'API de cotizaciones de monedas extranjeras en Mexico',
    },
  ]
  - [
    'meta',
    {
      name: 'keywords',
      content: 'mexico, dolar, dolar api, dolar api mexico',
    },
  ]
  - [
    'meta',
      {
        property: 'og:image',
        content: 'https://dolarapi.com/docs/assets/og.png',
      },
    ]
  - [
    'meta',
    {
      property: 'og:title',
      content: 'API para obtener el precio del Dólar en Chile',
    },
  ]
  - [
    'meta',
    {
      property: 'og:description',
      content: 'API de cotizaciones de monedas extranjeras en Chile',
    },
  ]
  - ['meta', { property: 'og:url', content: 'https://dolarapi.com' }]
  - ['meta', { property: 'og:site_name', content: 'DolarApi.com' }]
  - ['meta', { property: 'og:type', content: 'website' }]
  - ['meta', { property: 'og:locale', content: 'es_AR' }]
  - ['meta', { property: 'twitter:card', content: 'summary_large_image' }]
  - ['meta', { property: 'twitter:description', content: 'API de cotizaciones de monedas extranjeras en Chile' }]
  - ['meta', { property: 'twitter:title', content: 'API para obtener el precio del Dólar en Chile' }]
  - ['meta', { property: 'twitter:site', content: '@dolarapi' }]
  - ['meta', { property: 'twitter:creator', content: '@enzonotario_' }]
  - ['meta', { property: 'twitter:image', content: 'https://dolarapi.com/docs/assets/og.png' }]
  - ['meta', { property: 'twitter:url', content: 'https://dolarapi.com' }]
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('mx')
</script>

${plantilla(operationId, operation)}
`

  return markdown
}

try {
  init()
}
catch (error) {
  console.error(error)
}

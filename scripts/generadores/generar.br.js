import fs from 'node:fs'
import { useOpenapi } from 'vitepress-openapi/client'
import { plantilla } from './plantilla.js'

function loadJSON(path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
}

const spec = loadJSON('../../docs/public/brasil/openapi.json')

const openapi = useOpenapi({
  spec,
})

export function init() {
  return Object
    .keys(spec.paths)
    .map((path) => {
      const { operationId } = spec.paths[path].get

      const markdown = generateMarkdown(operationId)

      fs.writeFileSync(`docs/brasil/operations/${operationId}.md`, markdown)
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
      content: 'API de cotações de moedas estrangeiras no Brasil',
    },
  ]
  - [
    'meta',
    {
      name: 'keywords',
      content: 'brasil, dolar, euro, peso argentino, real, peso uruguaio, peso chileno, dolar api, dolar api brasil',
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
      content: 'API para obter o preço do Dólar no Brasil',
    },
  ]
  - [
    'meta',
    {
      property: 'og:description',
      content: 'API de cotações de moedas estrangeiras no Brasil',
    },
  ]
  - ['meta', { property: 'og:url', content: 'https://dolarapi.com' }]
  - ['meta', { property: 'og:site_name', content: 'DolarApi.com' }]
  - ['meta', { property: 'og:type', content: 'website' }]
  - ['meta', { property: 'og:locale', content: 'pt_BR' }]
  - ['meta', { property: 'twitter:card', content: 'summary_large_image' }]
  - ['meta', { property: 'twitter:description', content: 'API de cotações de moedas estrangeiras no Brasil' }]
  - ['meta', { property: 'twitter:title', content: 'API para obter o preço do Dólar no Brasil' }]
  - ['meta', { property: 'twitter:site', content: '@dolarapi' }]
  - ['meta', { property: 'twitter:creator', content: '@enzonotario_' }]
  - ['meta', { property: 'twitter:image', content: 'https://dolarapi.com/docs/assets/og.png' }]
  - ['meta', { property: 'twitter:url', content: 'https://dolarapi.com' }]
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('br')
</script>

${plantilla(operationId, operation, false, openapi, { openapiUrl: 'https://br.dolarapi.com/openapi.json' })}
`

  return markdown
}

try {
  init()
}
catch (error) {
  console.error(error)
}

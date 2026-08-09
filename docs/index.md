---
layout: home
title: 'API para obtener el precio del Dólar y Monedas en Argentina, Chile , Venezuela y Uruguay'
description: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista, Dólar Paralelo'
aside: false
outline: false

head:
  - [
    'meta',
    {
      name: 'description',
      content: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista, Dólar Paralelo',
    },
  ]
  - [
    'meta',
    {
      name: 'keywords',
      content: 'dolar, dolar oficial, dolar blue, dolar bolsa, dolar ccl, dolar mayorista, dolar api, dolar api argentina',
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
      content: 'API para obtener el precio del Dólar y Monedas en Argentina, Chile , Venezuela y Uruguay',
    },
  ]
  - [
    'meta',
    {
      property: 'og:description',
      content: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista, Dólar Paralelo',
    },
  ]
  - ['meta', { property: 'og:url', content: 'https://dolarapi.com' }]
  - ['meta', { property: 'og:site_name', content: 'DolarApi.com' }]
  - ['meta', { property: 'og:type', content: 'website' }]
  - ['meta', { property: 'og:locale', content: 'es_AR' }]
  - ['meta', { property: 'twitter:card', content: 'summary_large_image' }]
  - ['meta', { property: 'twitter:description', content: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista, Dólar Paralelo' }]
  - ['meta', { property: 'twitter:title', content: 'API para obtener el precio del Dólar y Monedas en Argentina, Chile , Venezuela y Uruguay' }]
  - ['meta', { property: 'twitter:site', content: '@dolarapi' }]
  - ['meta', { property: 'twitter:creator', content: '@enzonotario_' }]
  - ['meta', { property: 'twitter:image', content: 'https://dolarapi.com/docs/assets/og.png' }]
  - ['meta', { property: 'twitter:url', content: 'https://dolarapi.com' }]
---

<script setup>
import Home from '@theme/components/Home.vue';
</script>

<Home />

<llm-only>

## Guía para agentes

DolarApi expone cotizaciones por región. Preferí siempre el OpenAPI de la región.

- Argentina: `https://dolarapi.com/v1/*` — OpenAPI: `https://dolarapi.com/openapi.json`
- Resto: `https://{region}.dolarapi.com/v1/*` (`ve`, `bo`, `cl`, `uy`, `mx`, `br`, `co`) — OpenAPI: `https://{region}.dolarapi.com/openapi.json`
- Índice LLM: `https://dolarapi.com/llms.txt` (también en `/docs/llms.txt`)
- Specs en docs: `/docs/openapi.json`, `/docs/venezuela/openapi.json`, etc.

La fuente de verdad de paths y schemas es OpenAPI; las páginas Markdown son ayuda humana + resumen LLM.

</llm-only>


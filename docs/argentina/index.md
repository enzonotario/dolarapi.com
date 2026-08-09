---
title: 'API para obtener el precio del Dólar en Argentina'
description: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista'
aside: false
outline: false

next:
  text: 'Dólares'
  link: '/argentina/operations/get-dolares'

head:
  - [
      'meta',
      {
        name: 'description',
        content: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista',
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
        content: 'API para obtener el precio del Dólar en Argentina',
      },
    ]
  - [
      'meta',
      {
        property: 'og:description',
        content: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista',
      },
    ]
  - ['meta', { property: 'og:url', content: 'https://dolarapi.com' }]
  - ['meta', { property: 'og:site_name', content: 'DolarApi.com' }]
  - ['meta', { property: 'og:type', content: 'website' }]
  - ['meta', { property: 'og:locale', content: 'es_AR' }]
  - ['meta', { property: 'twitter:card', content: 'summary_large_image' }]
  - ['meta', { property: 'twitter:description', content: 'API para Dólar Oficial, Dólar Blue, Dólar Bolsa, Dólar CCL, Dólar Mayorista' }]
  - ['meta', { property: 'twitter:title', content: 'API para obtener el precio del Dólar en Argentina' }]
  - ['meta', { property: 'twitter:site', content: '@dolarapi' }]
  - ['meta', { property: 'twitter:creator', content: '@enzonotario_' }]
  - ['meta', { property: 'twitter:image', content: 'https://dolarapi.com/docs/assets/og.png' }]
  - ['meta', { property: 'twitter:url', content: 'https://dolarapi.com' }]
---

<script setup>
import IndexDemo from '../.vitepress/theme/components/IndexDemo.vue';
import { setRegionForSidebar } from '../.vitepress/sidebar/sidebar.utils.js';
import SponsorsAvatars from '../.vitepress/theme/components/sponsors/SponsorsAvatars.vue';

setRegionForSidebar('ar');
</script>

# DolarApi.com <small class="ml-2 text-sm">Región <span class="bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:!text-indigo-50 px-2 py-1 rounded-md">Argentina</span></small>

API desarrollada en [EsJS](https://es.js.org?ref=dolarapi.com) que brinda información actualizada sobre las cotizaciones del Dólar en Argentina.

¿Encontraste útil esta API? **¡Dejá tu ⭐ en [GitHub](https://github.com/enzonotario/esjs-dolar-api)!**

<div class="flex justify-center items-center gap-3">
<a href="https://github.com/enzonotario/esjs-dolar-api" target="_blank" class="flex justify-center items-center gap-1 px-4 py-2 bg-black !text-white hover:bg-gray-800 dark:bg-white dark:!text-black dark:hover:bg-gray-100 dark:hover:!text-black rounded-full !no-underline !font-bold">
<span class="i-mdi-github w-5 h-5" />
Ver en GitHub
</a>
</div>

## Base URL

```
https://dolarapi.com
```

<llm-only>

## Guía para agentes — Argentina

- Base URL: `https://dolarapi.com`
- Endpoints: `https://dolarapi.com/v1/*`
- OpenAPI (preferir): https://dolarapi.com/openapi.json
- Spec en docs: https://dolarapi.com/docs/openapi.json

La fuente de verdad de paths y schemas es el OpenAPI. Las páginas Markdown son ayuda humana + resumen LLM.

</llm-only>


<span v-if="false" class="i-mdi-chart-line" /> <!-- Force import -->

## Aviso Legal

DolarApi.com es un proyecto de código abierto que brinda datos de fuentes públicas. Para más información, consulta la seción de [Aviso Legal](/legal).

## Sponsors

<SponsorsAvatars />

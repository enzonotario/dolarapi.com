---
aside: false
outline: false
title: TRM
head:
  - [
    'meta',
    {
      name: 'description',
      content: 'API de cotizaciones de monedas extranjeras en Colombia',
    },
  ]
  - [
    'meta',
    {
      name: 'keywords',
      content: 'colombia, dolar, euro, peso argentino, real, peso uruguayo, peso chileno, dolar api, dolar api colombia',
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
      content: 'API para obtener el precio del Dólar en Colombia',
    },
  ]
  - [
    'meta',
    {
      property: 'og:description',
      content: 'API de cotizaciones de monedas extranjeras en Colombia',
    },
  ]
  - ['meta', { property: 'og:url', content: 'https://dolarapi.com' }]
  - ['meta', { property: 'og:site_name', content: 'DolarApi.com' }]
  - ['meta', { property: 'og:type', content: 'website' }]
  - ['meta', { property: 'og:locale', content: 'es_CO' }]
  - ['meta', { property: 'twitter:card', content: 'summary_large_image' }]
  - ['meta', { property: 'twitter:description', content: 'API de cotizaciones de monedas extranjeras en Colombia' }]
  - ['meta', { property: 'twitter:title', content: 'API para obtener el precio del Dólar en Colombia' }]
  - ['meta', { property: 'twitter:site', content: '@dolarapi' }]
  - ['meta', { property: 'twitter:creator', content: '@enzonotario_' }]
  - ['meta', { property: 'twitter:image', content: 'https://dolarapi.com/docs/assets/og.png' }]
  - ['meta', { property: 'twitter:url', content: 'https://dolarapi.com' }]
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('co')
</script>

<OAOperation :spec="spec" operationId="get-trm" :hide-branding="false">

<template #description="description">

Tasa de Cambio Representativa del Mercado (TRM) oficial de Colombia publicada por la Superintendencia Financiera

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-trm-footer.md -->

</template>

</OAOperation>

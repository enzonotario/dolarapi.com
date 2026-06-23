---
aside: false
outline: false
title: Dólar Oficial
head:
  - [
    'meta',
    {
      name: 'description',
      content: 'API de cotizaciones de monedas extranjeras en Bolivia',
    },
  ]
  - [
    'meta',
    {
      name: 'keywords',
      content: 'bolivia, dolar, dolar api, dolar api bolivia',
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

const spec = setRegionForSidebar('bo')
</script>

<OAOperation :spec="spec" operationId="get-dolar-oficial" :hide-branding="false">

<template #description="description">

Cotización del dólar estadounidense en pesos bolivianos

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolar-oficial-footer.md -->

</template>

</OAOperation>

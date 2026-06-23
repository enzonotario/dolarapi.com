---
aside: false
outline: false
title: Real Brasileño
head:
  - [
    'meta',
    {
      name: 'description',
      content: 'API de cotizaciones de monedas extranjeras en Chile',
    },
  ]
  - [
    'meta',
    {
      name: 'keywords',
      content: 'chile, dolar, euro, peso argentino, real, peso uruguayo, dolar api, dolar api chile',
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

const spec = setRegionForSidebar('cl')
</script>

<OAOperation :spec="spec" operationId="get-brl-clp" :hide-branding="false">

<template #description="description">

Cotización del real brasileño en pesos chilenos

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-brl-clp-footer.md -->

</template>

</OAOperation>

---
aside: false
outline: false
title: Euro
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizacion-eur" :hide-branding="false">

<template #description="description">

Cotización del Euro en el mercado.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizacion-eur-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/cotizaciones/eur

Euro

Cotización del Euro en el mercado.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Euro

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


---
aside: false
outline: false
title: Peso Chileno
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizacion-clp" :hide-branding="false">

<template #description="description">

Cotización del Peso Chileno en el mercado.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizacion-clp-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/cotizaciones/clp

Peso Chileno

Cotización del Peso Chileno en el mercado.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Peso Chileno

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


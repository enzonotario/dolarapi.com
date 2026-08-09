---
aside: false
outline: false
title: Cotizaciones
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizaciones" :hide-branding="false">

<template #description="description">

Devuelve la cotización de todas las monedas.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizaciones-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/cotizaciones

Cotizaciones

Devuelve la cotización de todas las monedas.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve todas las cotizaciones

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


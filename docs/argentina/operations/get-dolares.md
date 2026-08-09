---
aside: false
outline: false
title: Dólares
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-dolares" :hide-branding="false">

<template #description="description">

Devuelve la cotización actual del dólar estadounidense en Argentina. Incluye el precio de compra y venta de dólares en diferentes mercados (denominados "casas").

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolares-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/dolares

Dólares

Devuelve la cotización actual del dólar estadounidense en Argentina. Incluye el precio de compra y venta de dólares en diferentes mercados (denominados "casas").

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve todas las cotizaciones

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


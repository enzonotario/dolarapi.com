---
aside: false
outline: false
title: Estado de la API
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-estado" :hide-branding="false">

<template #description="description">

Devuelve el estado de la API.

</template>

<template #footer>

<!--@include: ./parts/get-estado-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/estado

Estado de la API

Devuelve el estado de la API.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve el estado de la API

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


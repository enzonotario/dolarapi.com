---
aside: false
outline: false
title: Dólar Cripto
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-dolar-cripto" :hide-branding="false">

<template #description="description">

Cotización del dólar estadounidense en el mercado de criptomonedas. Es decir, el precio de compra y venta de dólares en el mercado de criptoactivos.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolar-cripto-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/dolares/cripto

Dólar Cripto

Cotización del dólar estadounidense en el mercado de criptomonedas. Es decir, el precio de compra y venta de dólares en el mercado de criptoactivos.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Cripto

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


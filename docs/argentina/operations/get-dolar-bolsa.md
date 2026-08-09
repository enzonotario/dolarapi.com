---
aside: false
outline: false
title: Dólar Bolsa
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-dolar-bolsa" :hide-branding="false">

<template #description="description">

Cotización del dólar estadounidense en el mercado bursátil. Es decir, el precio de compra y venta de dólares en el mercado de valores. También conocido como **Dólar MEP**.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolar-bolsa-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/dolares/bolsa

Dólar Bolsa

Cotización del dólar estadounidense en el mercado bursátil. Es decir, el precio de compra y venta de dólares en el mercado de valores. También conocido como **Dólar MEP**.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Bolsa

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


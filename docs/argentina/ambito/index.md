---
aside: false
outline: false
title: Dólares Ámbito
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<div class="flex flex-col">

<OAOperation :spec="spec" operationId="get-ambito-dolares" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolares-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares

Dólares Ámbito

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve todas las cotizaciones

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-oficial" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-oficial-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/oficial

Dólar Oficial

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Oficial

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-bna" :hide-branding="true">

<template #description="description">

Devuelve la cotización del dólar Banco Nación según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-bna-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/bna

Dólar BNA

Devuelve la cotización del dólar Banco Nación según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar BNA

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-blue" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-blue-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/blue

Dólar Blue

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Blue

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-bolsa" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-bolsa-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/bolsa

Dólar Bolsa

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Bolsa

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-contadoconliqui" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-contadoconliqui-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/contadoconliqui

Dólar Contado con Liquidación

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Contado con liquidación

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-tarjeta" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-tarjeta-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/tarjeta

Dólar Tarjeta

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve el valor del Dólar Tarjeta

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-mayorista" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-mayorista-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/mayorista

Dólar Mayorista

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Mayorista

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAOperation :spec="spec" operationId="get-ambito-dolar-cripto" :hide-branding="true">

<template #description="description">

Devuelve la cotización según Ámbito Financiero.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-ambito-dolar-cripto-footer.md -->

</template>

</OAOperation>

<llm-only>

## GET /v1/ambito/dolares/cripto

Dólar Cripto

Devuelve la cotización según Ámbito Financiero.

### Servers

- https://dolarapi.com — Producción

### Responses

- `200` — Devuelve la cotización del Dólar Cripto

### OpenAPI

Source of truth for paths and schemas: https://dolarapi.com/openapi.json

</llm-only>


<hr style="margin: 4rem 0;">

<OAFooter />

</div>
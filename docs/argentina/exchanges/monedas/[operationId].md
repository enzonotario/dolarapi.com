---
aside: false
outline: false
title: vitepress-openapi
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { useOpenapi } from 'vitepress-openapi/client'
import spec from '../../../public/exchanges/openapi.json'

const route = useRoute()

const { isDark, params } = useData()

const operationId = route.data.params.operationId

const openapi = useOpenapi({ spec })

const pair = operationId.match(/get-exchange-moneda-(.*)-(.*)/).slice(1).join('/')

document.title = params.value.pageTitle
</script>

<OAOperation :spec="spec" :operationId="operationId" :isDark="isDark">

<template #description="description">

<DataSources :sources="description.operation['x-data-source']" />

</template>

</OAOperation>

<template v-if="pair === 'brl/ars' || pair === 'usd/brl'">

## Ejemplos de uso

### Opciones para pagar

<ChartExchangeMonedas mode="compra" />

### Opciones para cobrar

<ChartExchangeMonedas mode="venta" />

</template>

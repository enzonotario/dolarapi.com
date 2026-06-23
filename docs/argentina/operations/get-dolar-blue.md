---
aside: false
outline: false
title: Dólar Blue
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-dolar-blue" :hide-branding="false">

<template #description="description">

Cotización del dólar estadounidense en el mercado paralelo o informal. Es decir, el precio de compra y venta de dólares en cuevas o casas de cambio no autorizadas por el Banco Central de la República Argentina (BCRA).

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolar-blue-footer.md -->

</template>

</OAOperation>

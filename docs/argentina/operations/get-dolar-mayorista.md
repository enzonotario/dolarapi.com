---
aside: false
outline: false
title: Dólar Mayorista
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-dolar-mayorista" :hide-branding="false">

<template #description="description">

Cotización del dólar estadounidense en el mercado mayorista. Es decir, el precio de compra y venta de dólares en el mercado interbancario.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolar-mayorista-footer.md -->

</template>

</OAOperation>

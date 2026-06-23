---
aside: false
outline: false
title: Peso Uruguayo
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizacion-uyu" :hide-branding="false">

<template #description="description">

Cotización del Peso Uruguayo en el mercado.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizacion-uyu-footer.md -->

</template>

</OAOperation>

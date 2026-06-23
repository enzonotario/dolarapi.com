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

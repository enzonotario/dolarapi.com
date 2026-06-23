---
aside: false
outline: false
title: Euro
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizacion-eur" :hide-branding="false">

<template #description="description">

Cotización del Euro en el mercado.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizacion-eur-footer.md -->

</template>

</OAOperation>

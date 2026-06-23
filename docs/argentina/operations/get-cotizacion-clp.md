---
aside: false
outline: false
title: Peso Chileno
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizacion-clp" :hide-branding="false">

<template #description="description">

Cotización del Peso Chileno en el mercado.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizacion-clp-footer.md -->

</template>

</OAOperation>

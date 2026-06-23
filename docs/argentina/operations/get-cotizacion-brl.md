---
aside: false
outline: false
title: Real Brasileño
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-cotizacion-brl" :hide-branding="false">

<template #description="description">

Cotización del Real Brasileño en el mercado.

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-cotizacion-brl-footer.md -->

</template>

</OAOperation>

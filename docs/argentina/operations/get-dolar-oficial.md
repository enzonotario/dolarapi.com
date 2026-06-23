---
aside: false
outline: false
title: Dólar Oficial
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<OAOperation :spec="spec" operationId="get-dolar-oficial" :hide-branding="false">

<template #description="description">

Cotización del dólar estadounidense en el mercado oficial. Es decir, el precio de compra y venta de dólares en bancos y casas de cambio autorizadas por el Banco Central de la República Argentina (BCRA).

<DataSources :sources="description.operation['x-data-source']" />

</template>

<template #footer>

<!--@include: ./parts/get-dolar-oficial-footer.md -->

</template>

</OAOperation>

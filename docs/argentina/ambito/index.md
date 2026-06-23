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

<hr style="margin: 4rem 0;">

<OAFooter />

</div>
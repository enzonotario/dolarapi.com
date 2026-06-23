---
aside: false
outline: false
title: Listado de Exchanges
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { useOpenapi } from 'vitepress-openapi/client'
import spec from '../../public/exchanges/openapi.json'

const { isDark } = useData()
</script>

<OAOperation :spec="spec" operationId="get-exchanges" :isDark="isDark">

<template #description="description">

<DataSources :sources="description.operation['x-data-source']" />

</template>

</OAOperation>

## Ejemplos de uso

```js eval code=false inspector=false
async function getData() {
  const data = await fetch('https://dolarapi.com/v1/exchanges').then((res) => res.json())

  return data
}
```

```js eval code=false
Inputs.table(getData())
```

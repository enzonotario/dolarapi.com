---
aside: false
outline: false
title: vitepress-openapi
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { useOpenapi } from 'vitepress-openapi/client'
import spec from '../../../public/exchanges/openapi.json'

const route = useRoute()

const { isDark, params } = useData()

const operationId = route.data.params.operationId

const openapi = useOpenapi({ spec })

const pair = operationId.match(/get-exchange-moneda-(.*)-(.*)/).slice(1).join('/')

document.title = params.value.pageTitle
</script>

<OAOperation :spec="spec" :operationId="operationId" :isDark="isDark">

<template #description="description">

<DataSources :sources="description.operation['x-data-source']" />

</template>

</OAOperation>

<template v-if="pair === 'brl/ars' || pair === 'usd/brl'">

## Ejemplos de uso

```js eval code=false inspector=false
function getPair() {
  return window.location.pathname.match(/get-exchange-moneda-(.*)-(.*).html/).slice(1)
}
```

```js eval code=false inspector=false
function getEndpoint() {
  const url = `https://dolarapi.com/v1/exchanges/monedas/${getPair()[0]}/${getPair()[1]}`

  return url
}
```

```js eval code=false inspector=false
function getSortCompra() {
  const pair = getPair().join('/')
  switch (pair) {
    case 'brl/ars':
      return 'asc'
    case 'usd/brl':
      return 'desc'
    default:
      return 'asc'
  }
}
```

```js eval code=false inspector=false
function getSortVenta() {
  const pair = getPair().join('/')
    switch (pair) {
      case 'brl/ars':
        return 'desc'
      case 'usd/brl':
        return 'desc'
      default:
        return 'desc'
    }
}
```

```js eval code=false inspector=false
async function getData() {
    const exchanges = await fetch('https://dolarapi.com/v1/exchanges').then((res) => res.json());
    const monedas = (await fetch(getEndpoint()).then((res) => res.json()))
  
    return monedas
        .map((moneda) => {
            const exchange = exchanges.find((exchange) => exchange.id === moneda.exchange);
          
            const exchangeSufijo = moneda.criptomonedaBase ? `-cryptoBase-${moneda.criptomonedaBase}` : ''
              + (moneda.criptomoneda ? `-crypto-${moneda.criptomoneda}` : '')
          
            const nombreSufijo = moneda.criptomonedaBase ? ` (${moneda.criptomonedaBase})` : ''
              + (moneda.criptomoneda ? ` (${moneda.criptomoneda})` : '')
          
            return {
                exchange: moneda.exchange + exchangeSufijo,
                compra: moneda.compra,
                venta: moneda.venta,
                exchangeLogo: exchange ? exchange.logo : null,
                exchangeNombre: exchange.nombre + nombreSufijo,
            };
        })
}
```

```js eval code=false inspector=false
function getPlotBase({
    data,
    x,
    y,
    xLabel,
    yLabel,
    title,
    additionalMarks,
    sort,
}) {
    return Plot.plot({
        width,
        marginTop: 60,
        x: {label: xLabel},
        y: {label: yLabel},
        marks: [
          Plot.ruleY([0]),
          Plot.image(data, {
            x: x,
            y: y,
            src: 'exchangeLogo',
            width: 40,
            r: 20,
            title: 'exchange',
            sort: {x: sort === 'asc' ? 'y' : '-y'},
          }),
          Plot.text(data, {x: x, y: y, text: 'exchangeNombre', dy: 35, lineAnchor: 'bottom'}),
          Plot.text(data, {x: x, y: y, text: y, dy: 50, lineAnchor: 'bottom'}),
          Plot.tip(data, Plot.pointerX({x: x, y: y})),
          ...additionalMarks,
        ]
    }) 
}
```

### Opciones para pagar

```js eval code=false t=plot
(async () => {
  const data = (await getData())
    .filter((moneda) => moneda.compra > 0)
    .sort((a, b) => getSortCompra() === 'asc' ? a.compra - b.compra : b.compra - a.compra);

  const mejorOpcion = data[0];

  return getPlotBase({
    data,
    x: 'exchangeNombre',
    y: 'compra',
    xLabel: 'Exchange',
    yLabel: 'Compra',
    title: 'Mejor opción para pagar',
    additionalMarks: [
      Plot.tip(
        ['Mejor opción para pagar', mejorOpcion.compra],
        {x: [mejorOpcion.exchangeNombre], y: [mejorOpcion.compra], dy: -10, anchor: 'bottom'}
      ),
    ],
    sort: getSortCompra(),
  })
})()
```

### Opciones para cobrar

```js eval code=false t=plot
(async () => {
  const data = (await getData())
    .filter((moneda) => moneda.venta > 0)
    .sort((a, b) => getSortVenta() === 'asc' ? a.venta - b.venta : b.venta - a.venta);

  const mejorOpcion = data[0];

  return getPlotBase({
    data,
    x: 'exchangeNombre',
    y: 'venta',
    xLabel: 'Exchange',
    yLabel: 'Venta',
    title: 'Mejor opción para cobrar',
    additionalMarks: [
      Plot.tip(
        ['Mejor opción para cobrar', mejorOpcion.venta],
        {x: [mejorOpcion.exchangeNombre], y: [mejorOpcion.venta], dy: -10, anchor: 'bottom'}
      ),
    ],
    sort: getSortVenta(),
  })
})()
```

</template>

<script setup>
import colors from 'tailwindcss/colors'
import { useRoute } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { useApi } from '../../composables/useApi'
import { useEcharts } from '../../composables/useEcharts'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: value => ['compra', 'venta'].includes(value),
  },
})

const route = useRoute()
const api = useApi()
const chartRef = ref()

const { setOptions, theme } = useEcharts(chartRef)

const title = computed(() => {
  return props.mode === 'compra'
    ? 'Mejor opción para pagar'
    : 'Mejor opción para cobrar'
})

function getPair() {
  const match = route.path.match(/get-exchange-moneda-([^/]+)-([^/.]+)/)
  return match ? [match[1], match[2]] : []
}

function getEndpoint() {
  const [base, quote] = getPair()
  return `/exchanges/monedas/${base}/${quote}`
}

function getSortDirection() {
  const pair = getPair().join('/')

  if (props.mode === 'compra') {
    return pair === 'usd/brl' ? 'desc' : 'asc'
  }

  return 'desc'
}

async function fetchData() {
  const exchanges = await api.get('/exchanges')
  const monedas = await api.get(getEndpoint())

  return monedas.map((moneda) => {
    const exchange = exchanges.find(item => item.id === moneda.exchange)

    const exchangeSufijo = `${moneda.criptomonedaBase ? `-cryptoBase-${moneda.criptomonedaBase}` : ''}${moneda.criptomoneda ? `-crypto-${moneda.criptomoneda}` : ''}`
    const nombreSufijo = `${moneda.criptomonedaBase ? ` (${moneda.criptomonedaBase})` : ''}${moneda.criptomoneda ? ` (${moneda.criptomoneda})` : ''}`

    return {
      exchange: `${moneda.exchange}${exchangeSufijo}`,
      compra: moneda.compra,
      venta: moneda.venta,
      exchangeLogo: exchange?.logo ?? null,
      exchangeNombre: `${exchange?.nombre ?? moneda.exchange}${nombreSufijo}`,
    }
  })
}

async function setChartOptions() {
  const field = props.mode
  const direction = getSortDirection()

  const data = (await fetchData())
    .filter(item => item[field] > 0)
    .sort((a, b) => direction === 'asc' ? a[field] - b[field] : b[field] - a[field])

  const bestOption = data[0]

  setOptions({
    grid: {
      left: 24,
      right: 24,
      top: 48,
      bottom: 96,
      containLabel: true,
    },
    title: {
      text: title.value,
      left: 'center',
      textStyle: {
        color: theme.value === 'dark' ? colors.gray[100] : colors.gray[800],
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params) => {
        const item = data[params[0].dataIndex]

        return `
          <div class="flex flex-col gap-1">
            <div class="font-semibold">${item.exchangeNombre}</div>
            <div>Compra: ${item.compra.toLocaleString('es-AR')}</div>
            <div>Venta: ${item.venta.toLocaleString('es-AR')}</div>
          </div>
        `
      },
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.exchangeNombre),
      axisLabel: {
        color: theme.value === 'dark' ? colors.gray[100] : colors.gray[800],
        rotate: 35,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      name: props.mode === 'compra' ? 'Compra' : 'Venta',
      nameTextStyle: {
        color: theme.value === 'dark' ? colors.gray[100] : colors.gray[800],
      },
      axisLabel: {
        color: theme.value === 'dark' ? colors.gray[100] : colors.gray[800],
      },
      splitLine: {
        lineStyle: {
          color: theme.value === 'dark' ? colors.gray[700] : colors.gray[200],
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: data.map((item, index) => ({
          value: item[field],
          itemStyle: {
            color: index === 0
              ? colors.indigo[theme.value === 'dark' ? 400 : 500]
              : colors.gray[theme.value === 'dark' ? 500 : 400],
          },
        })),
        markPoint: bestOption
          ? {
              symbol: 'pin',
              symbolSize: 48,
              data: [{
                name: title.value,
                coord: [bestOption.exchangeNombre, bestOption[field]],
                value: bestOption[field],
              }],
              label: {
                color: theme.value === 'dark' ? colors.gray[100] : colors.gray[800],
              },
            }
          : undefined,
      },
    ],
  })
}

watch(theme, async () => {
  await setChartOptions()
})

onMounted(async () => {
  await setChartOptions()
})
</script>

<template>
  <div class="mt-8">
    <div ref="chartRef" class="h-[28rem] w-full echarts-chart" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import colors from 'tailwindcss/colors'
import { useApi } from '../../composables/useApi'
import { useEcharts } from '../../composables/useEcharts'

const coloresMap = {
  oficial: '#6b7280',
  blue: '#3b82f6',
  bolsa: '#6366f1',
  contadoconliqui: '#22c55e',
  mayorista: '#ec4899',
  tarjeta: '#f97316',
  cripto: '#eab308',
}

const casasMap = {
  oficial: 'Oficial',
  blue: 'Blue',
  bolsa: 'MEP',
  contadoconliqui: 'CCL',
  mayorista: 'Mayorista',
  tarjeta: 'Tarjeta',
  cripto: 'Cripto',
}

const chartRef = ref()
const updatedAt = ref('')
const chartData = ref([])

const { setOptions, theme } = useEcharts(chartRef)
const api = useApi()

function createArrowShape(start, end, color) {
  const [x1, y1] = start
  const [x2, y2] = end
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const headLength = 8
  const headAngle = Math.PI / 6

  const x3 = x2 - headLength * Math.cos(angle - headAngle)
  const y3 = y2 - headLength * Math.sin(angle - headAngle)
  const x4 = x2 - headLength * Math.cos(angle + headAngle)
  const y4 = y2 - headLength * Math.sin(angle + headAngle)

  return [
    {
      type: 'line',
      shape: { x1, y1, x2, y2 },
      style: { stroke: color, lineWidth: 2 },
    },
    {
      type: 'polygon',
      shape: { points: [[x2, y2], [x3, y3], [x4, y4]] },
      style: { fill: color },
    },
  ]
}

function renderBrechaItem(params, api) {
  const nombre = api.value(0)
  const x1 = api.value(1)
  const x2 = api.value(2)
  const color = api.value(3)
  const brecha = api.value(4)
  const isOficial = api.value(5)

  const pointStart = api.coord([x1, nombre])
  const pointEnd = api.coord([x2, nombre])
  const textColor = theme.value === 'dark' ? colors.gray[100] : colors.gray[900]
  const children = []

  if (isOficial) {
    children.push({
      type: 'circle',
      shape: { cx: pointEnd[0], cy: pointEnd[1], r: 10 },
      style: { fill: color },
    })
    children.push({
      type: 'text',
      style: {
        text: `$${x2.toFixed(2)}`,
        x: pointEnd[0],
        y: pointEnd[1] - 20,
        textAlign: 'center',
        textVerticalAlign: 'bottom',
        fill: textColor,
        fontWeight: 'bold',
        fontSize: 12,
      },
    })
  }
  else {
    const arrowColor = x2 > x1 ? '#14b8a6' : '#ef4444'

    children.push(...createArrowShape(pointStart, pointEnd, arrowColor))
    children.push({
      type: 'circle',
      shape: { cx: pointStart[0], cy: pointStart[1], r: 5 },
      style: { fill: color },
    })
    children.push({
      type: 'text',
      style: {
        text: `${brecha > 0 ? '+' : ''}${brecha.toFixed(2)}%`,
        x: pointStart[0] + 30,
        y: pointStart[1] - 10,
        textAlign: 'left',
        textVerticalAlign: 'bottom',
        fill: textColor,
        fontSize: 11,
      },
    })

    const priceText = `$${x2.toFixed(2)}`

    if (brecha > 0) {
      children.push({
        type: 'text',
        style: {
          text: priceText,
          x: pointEnd[0] + 50,
          y: pointEnd[1],
          textAlign: 'right',
          textVerticalAlign: 'middle',
          fill: textColor,
          fontSize: 11,
        },
      })
    }
    else if (brecha < 0) {
      children.push({
        type: 'text',
        style: {
          text: priceText,
          x: pointEnd[0] - 50,
          y: pointEnd[1],
          textAlign: 'left',
          textVerticalAlign: 'middle',
          fill: textColor,
          fontSize: 11,
        },
      })
    }
  }

  return {
    type: 'group',
    children,
  }
}

async function fetchDolares() {
  const dolares = await api.get('/dolares')
  const dolarOficial = dolares.find(dolar => dolar.casa === 'oficial')
  const oficialVenta = dolarOficial.venta

  return dolares
    .map((dolar) => {
      const brecha = dolar.casa === 'oficial'
        ? 0
        : ((dolar.venta - oficialVenta) / oficialVenta) * 100

      return {
        casa: dolar.casa,
        nombre: casasMap[dolar.casa] ?? dolar.nombre,
        venta: dolar.venta,
        color: coloresMap[dolar.casa] ?? colors.gray[500],
        brecha,
        oficialVenta,
        fechaActualizacion: dolar.fechaActualizacion,
      }
    })
    .sort((a, b) => {
      if (a.brecha !== b.brecha)
        return a.brecha - b.brecha
      if (a.casa === 'oficial')
        return 1
      if (b.casa === 'oficial')
        return -1
      return a.venta - b.venta
    })
}

async function setChartOptions() {
  const data = await fetchDolares()
  chartData.value = data

  const oficialVenta = data.find(item => item.casa === 'oficial')?.venta ?? 0

  updatedAt.value = new Date(data[0]?.fechaActualizacion ?? Date.now()).toLocaleString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })

  const axisColor = theme.value === 'dark' ? colors.gray[300] : colors.gray[600]
  const gridColor = theme.value === 'dark' ? colors.gray[700] : colors.gray[200]

  setOptions({
    grid: {
      left: 88,
      right: 88,
      top: 48,
      bottom: 24,
      containLabel: false,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const item = data[params.dataIndex]
        if (!item)
          return ''

        return `
          <div class="flex flex-col gap-1">
            <div class="font-semibold">${item.nombre}</div>
            <div>Venta: $${item.venta.toLocaleString('es-AR')}</div>
            <div>Brecha: ${item.brecha > 0 ? '+' : ''}${item.brecha.toFixed(2)}%</div>
          </div>
        `
      },
    },
    xAxis: {
      type: 'value',
      position: 'top',
      min: oficialVenta / 1.5,
      max: oficialVenta / 0.5,
      axisLine: {
        lineStyle: { color: gridColor },
      },
      axisTick: {
        lineStyle: { color: gridColor },
      },
      axisLabel: {
        color: axisColor,
        formatter: value => value.toLocaleString('es-AR'),
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: gridColor,
        },
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: data.map(item => item.nombre),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: axisColor,
        fontSize: 12,
      },
    },
    series: [
      {
        type: 'custom',
        renderItem: renderBrechaItem,
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: data.map(item => [
          item.nombre,
          item.oficialVenta,
          item.venta,
          item.color,
          item.brecha,
          item.casa === 'oficial',
        ]),
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
  <div>
    <h3 style="margin-top: 0">
      Variación de Cotizaciones respecto al Oficial
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ updatedAt }}
    </p>
    <div ref="chartRef" class="h-[25rem] w-full echarts-chart" />
  </div>
</template>

import { computed } from 'vue'
import { useDark, useECharts } from '@pureadmin/utils'

export function useEcharts(chartRef) {
  const { isDark } = useDark()

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'default'
  })

  const { setOptions } = useECharts(chartRef, { theme, renderer: 'svg' })

  return {
    setOptions,
    theme,
  }
}

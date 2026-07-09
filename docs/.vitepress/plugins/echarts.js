import * as echarts from 'echarts'

export function useECharts(app) {
  app.config.globalProperties.$echarts = echarts
}

export default echarts

import { theme, useTheme } from 'vitepress-openapi/client'
import DefaultTheme from 'vitepress/theme'
import { useECharts } from '../plugins/echarts'
import chartComponents from './components/charts'
import DataSources from './components/DataSources.vue'
import IndexDemo from './components/IndexDemo.vue'
import MarkdownLink from './components/MarkdownLink.vue'
import SponsorsAvatars from './components/sponsors/SponsorsAvatars.vue'
import CustomLayout from './CustomLayout.vue'

import 'vitepress-openapi/dist/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  async enhanceApp({ app }) {
    useTheme({
      i18n: {
        locale: 'es',
      },
      path: {
        showBaseURL: true,
      },
    })

    theme.enhanceApp({ app })

    app.use(useECharts)

    for (const [name, component] of Object.entries(chartComponents))
      app.component(name, component)

    app.component('IndexDemo', IndexDemo)
    app.component('SponsorsAvatars', SponsorsAvatars)
    app.component('DataSources', DataSources)
    app.component('MarkdownLink', MarkdownLink)
  },
}

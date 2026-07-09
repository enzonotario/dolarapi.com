import { defineAsyncComponent } from 'vue'

export default {
  ChartDolaresBrecha: defineAsyncComponent(() => import('./ChartDolaresBrecha.vue')),
  DolarCasaCard: defineAsyncComponent(() => import('./DolarCasaCard.vue')),
  ChartExchangeMonedas: defineAsyncComponent(() => import('./ChartExchangeMonedas.vue')),
  ExchangesTable: defineAsyncComponent(() => import('./ExchangesTable.vue')),
}

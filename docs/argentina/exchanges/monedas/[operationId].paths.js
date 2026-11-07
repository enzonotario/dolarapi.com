import { usePaths } from 'vitepress-openapi'
import spec from '../../../public/exchanges/openapi.json'

export default {
  paths() {
    return usePaths({ spec })
      .getPathsByVerbs()
      .filter(({ operationId }) => operationId.startsWith('get-exchange-moneda-'))
      .map(({ operationId, summary }) => {
        return {
          params: {
            operationId,
            pageTitle: `${summary} - DolarApi.com`,
          },
        }
      })
  },
}

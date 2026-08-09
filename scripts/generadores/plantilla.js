import { operationToMarkdown } from 'vitepress-openapi'

/**
 * @param {string} operationId
 * @param {object} operation
 * @param {boolean} [hideBranding=false]
 * @param {object|null} [openapi=null] - Instancia useOpenapi para enriquecer `<llm-only>`
 * @param {{ openapiUrl?: string }} [options]
 */
export function plantilla(operationId, operation, hideBranding = false, openapi = null, options = {}) {
  const dataSource = operation['x-data-source']
    ? `
<DataSources :sources="description.operation['x-data-source']" />
`
    : ''

  const llmOnly = openapi
    ? `
<llm-only>

${operationToMarkdown(openapi, operationId, options)}

</llm-only>
`
    : ''

  const markdown = `<OAOperation :spec="spec" operationId="${operationId}" :hide-branding="${hideBranding}">

<template #description="description">

${operation.description || ''}
${dataSource}
</template>

<template #footer>

<!--@include: ./parts/${operationId}-footer.md -->

</template>

</OAOperation>
${llmOnly}`

  return markdown
}

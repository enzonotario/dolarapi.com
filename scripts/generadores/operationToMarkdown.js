/**
 * Build LLM-friendly Markdown for a single OpenAPI operation.
 *
 * Vendored from https://github.com/enzonotario/vitepress-openapi/pull/343 while
 * `operationToMarkdown` is not part of a published release. Remove this file and
 * import it from `vitepress-openapi` once the PR is merged and released.
 *
 * @param {import('vitepress-openapi/client').OpenApiSpecInstance} openapi
 * @param {string} operationId
 * @param {{ openapiUrl?: string }} [options]
 * @returns {string}
 */
export function operationToMarkdown(openapi, operationId, options = {}) {
  if (!operationId)
    return ''

  const method = (openapi.getOperationMethod(operationId) || 'get').toUpperCase()
  const path = openapi.getOperationPath(operationId) || ''
  const operation = openapi.getOperation(operationId) || {}
  const parameters = openapi.getOperationParameters(operationId) || []
  const servers = openapi.getOperationServers(operationId) || []

  const lines = [
    `## ${method} ${path}`,
    '',
  ]

  if (operation.summary)
    lines.push(operation.summary, '')

  if (operation.description)
    lines.push(String(operation.description).trim(), '')

  if (servers.length) {
    lines.push('### Servers', '')
    for (const server of servers) {
      const desc = server.description ? ` — ${server.description}` : ''
      lines.push(`- ${server.url}${desc}`)
    }
    lines.push('')
  }

  if (parameters.length) {
    lines.push('### Parameters', '')
    for (const param of parameters) {
      const required = param.required ? 'required' : 'optional'
      const schemaType = param.schema?.type || param.schema?.$ref || 'any'
      const desc = param.description ? ` — ${param.description}` : ''
      lines.push(`- \`${param.name}\` (${param.in}, ${schemaType}, ${required})${desc}`)
    }
    lines.push('')
  }

  const responseKeys = Object.keys(operation.responses || {})
  if (responseKeys.length) {
    lines.push('### Responses', '')
    for (const status of responseKeys) {
      const response = operation.responses[status]
      const desc = response?.description ? ` — ${response.description}` : ''
      lines.push(`- \`${status}\`${desc}`)
    }
    lines.push('')
  }

  if (options.openapiUrl) {
    lines.push('### OpenAPI', '')
    lines.push(`Source of truth for paths and schemas: ${options.openapiUrl}`)
    lines.push('')
  }

  return lines.join('\n').trim()
}

/**
 * Guía fija para agentes / LLMs, inyectada en llms.txt y espejada en índices de región.
 */
export const LLM_AGENTS_DETAILS = `## Guía para agentes

DolarApi expone cotizaciones por región. La fuente de verdad de paths y schemas es siempre el OpenAPI de la región; las páginas Markdown son ayuda humana + resumen LLM.

### Arquitectura por host

- Argentina: \`https://dolarapi.com/v1/*\`
- Resto: \`https://{region}.dolarapi.com/v1/*\` (\`ve\`, \`bo\`, \`cl\`, \`uy\`, \`mx\`, \`br\`, \`co\`)

### OpenAPI (preferir siempre)

- Root (Argentina): \`https://dolarapi.com/openapi.json\`
- Por host: \`https://{region}.dolarapi.com/openapi.json\`
- Specs estáticos en docs: \`https://dolarapi.com/docs/openapi.json\`, \`https://dolarapi.com/docs/venezuela/openapi.json\`, etc.

### Regiones

| Región | Docs | Base URL | OpenAPI |
| --- | --- | --- | --- |
| Argentina | /docs/argentina/ | https://dolarapi.com | https://dolarapi.com/openapi.json |
| Venezuela | /docs/venezuela/ | https://ve.dolarapi.com | https://ve.dolarapi.com/openapi.json |
| Chile | /docs/chile/ | https://cl.dolarapi.com | https://cl.dolarapi.com/openapi.json |
| Uruguay | /docs/uruguay/ | https://uy.dolarapi.com | https://uy.dolarapi.com/openapi.json |
| México | /docs/mexico/ | https://mx.dolarapi.com | https://mx.dolarapi.com/openapi.json |
| Bolivia | /docs/bolivia/ | https://bo.dolarapi.com | https://bo.dolarapi.com/openapi.json |
| Brasil | /docs/brasil/ | https://br.dolarapi.com | https://br.dolarapi.com/openapi.json |
| Colombia | /docs/colombia/ | https://co.dolarapi.com | https://co.dolarapi.com/openapi.json |

Cada región también publica \`/docs/{region}/llms.txt\` con el índice local.`

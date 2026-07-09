import { useSidebar } from 'vitepress-openapi'
import { useOpenapi } from 'vitepress-openapi/client'
import exchangesSpec from '../../public/exchanges/openapi.json'
import { useRegion } from '../theme/composables/useRegion.js'
import { addRegionPrefixToSidebarItems, setRegionForSidebar } from './sidebar.utils.js'

const region = useRegion().regions.find(region => region.code === 'ar')

setRegionForSidebar(region.code)

const sidebar = useSidebar({ spec: region.spec })

function getCotizacionActualItems() {
  const dolares = sidebar.generateSidebarGroup(
    {
      tag: 'Cotización actual Dólares',
      text: 'Dólares',
    },
  )

  const monedas = sidebar.generateSidebarGroup(
    {
      tag: 'Cotización actual Monedas',
      text: 'Otras Monedas',
    },
  )

  return [
    {
      ...dolares,
      ...addRegionPrefixToSidebarItems(region.prefix, dolares),
    },
    {
      ...monedas,
      ...addRegionPrefixToSidebarItems(region.prefix, monedas),
    },
  ]
}

const exchangesOpenapi = useOpenapi({ spec: exchangesSpec })
const exchangesSpecTags = exchangesOpenapi.getOperationsTags()

export default function () {
  return [
    {
      text: `<span class="OASidebarItem">
        <svg class="i-mdi-home w-5 h-5" />
        <span class="OASidebarItem-text">Inicio</span>
      </span>`,
      link: '/argentina',
    },
    {
      text: `<span class="OASidebarItem">
        <svg class="i-mdi-github w-5 h-5" />
        <span class="OASidebarItem-text">GitHub</span>
      </span>`,
      link: 'https://github.com/enzonotario/esjs-dolar-api',
    },
    {
      text: 'Cotización actual',
      items: getCotizacionActualItems(),
    },
    {
      text: 'Cotización histórica',
      items: [
        {
          items: [
            {
              text: `<span class="OASidebarItem">
              <svg class="i-mdi-chart-line w-5 h-5" />
              <span class="OASidebarItem-text">ArgentinaDatos</span> 
              </span>`,
              link: 'https://argentinadatos.com/',
            },
          ],
        },
      ],
    },
    {
      text: 'Cotización Ámbito',
      items: [
        {
          items: [
            {
              text: `<span class="OASidebarItem">
            <span class="w-5 h-5 bg-blue-200 text-gray-800 dark:bg-blue-600 dark:text-white rounded-full text-xs flex items-center justify-center">AF</span>
            <span class="OASidebarItem-text">Dólares Ámbito</span>
          </span>`,
              link: '/argentina/ambito/',
            },
          ],
        },
      ],
    },
    {
      text: 'Cotización Exchanges',
      items: [
        useSidebar({
          spec: exchangesSpec,
          linkPrefix: '/argentina/exchanges/',
        }).generateSidebarGroup({
          tag: 'Exchanges',
        }),
        ...useSidebar({
          spec: exchangesSpec,
          linkPrefix: '/argentina/exchanges/monedas/',
        }).generateSidebarGroups({
          tags: exchangesSpecTags.filter(tag => tag !== 'Exchanges'),
        }),
      ],
      collapsed: true,
    },
    addRegionPrefixToSidebarItems(region.prefix, sidebar.generateSidebarGroup({
      tag: 'API',
    })),
  ]
}

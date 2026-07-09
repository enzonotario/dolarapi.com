import { useSidebar } from 'vitepress-openapi'
import { useRegion } from '../theme/composables/useRegion.js'
import {
  addRegionPrefixToSidebarItems,
  setRegionForSidebar,
} from './sidebar.utils.js'

const region = useRegion().regions.find(region => region.code === 've')

setRegionForSidebar(region.code)

const sidebar = useSidebar({ spec: region.spec })

export default function () {
  return [
    {
      text: `<span class="OASidebarItem">
        <svg class="i-mdi-home w-5 h-5" />
        <span class="OASidebarItem-text">Inicio</span>
      </span>`,
      link: '/venezuela/',
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
      items: [
        addRegionPrefixToSidebarItems(
          region.prefix,
          sidebar.generateSidebarGroup({
            tag: 'Cotizaciones',
            text: '',
          }),
        ),
        {
          text: 'Dólares',
          ...addRegionPrefixToSidebarItems(
            region.prefix,
            sidebar.generateSidebarGroup({
              tag: 'Cotización actual Dólares',
              text: '',
            }),
          ),
        },
        {
          text: 'Euros',
          ...addRegionPrefixToSidebarItems(
            region.prefix,
            sidebar.generateSidebarGroup({
              tag: 'Cotización actual Euros',
              text: '',
            }),
          ),
        },
      ],
    },
    {
      text: 'Históricos',
      items: [
        {
          text: 'Dólares',
          ...addRegionPrefixToSidebarItems(
            region.prefix,
            sidebar.generateSidebarGroup({
              tag: 'Históricos Dólares',
              text: '',
            }),
          ),
        },
        {
          text: 'Euros',
          ...addRegionPrefixToSidebarItems(
            region.prefix,
            sidebar.generateSidebarGroup({
              tag: 'Históricos Euros',
              text: '',
            }),
          ),
        },
      ],
    },
    addRegionPrefixToSidebarItems(
      region.prefix,
      sidebar.generateSidebarGroup({
        tag: 'API',
        text: '',
      }),
    ),
  ]
}

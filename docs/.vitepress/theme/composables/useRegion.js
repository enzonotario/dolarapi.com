import { useOpenapi } from 'vitepress-openapi/client'
import { ref } from 'vue'
import boSpec from '../../../public/bolivia/openapi.json'
import brSpec from '../../../public/brasil/openapi.json'
import clSpec from '../../../public/chile/openapi.json'
import coSpec from '../../../public/colombia/openapi.json'
import mxSpec from '../../../public/mexico/openapi.json'
import arSpec from '../../../public/openapi.json'
import uySpec from '../../../public/uruguay/openapi.json'
import veSpec from '../../../public/venezuela/openapi.json'

const regions = [
  {
    code: 'ar',
    name: 'Argentina',
    prefix: '/argentina',
    spec: arSpec,
    default: true,
  },
  {
    code: 'cl',
    name: 'Chile',
    prefix: '/chile',
    spec: clSpec,
  },
  {
    code: 've',
    name: 'Venezuela',
    prefix: '/venezuela',
    spec: veSpec,
  },
  {
    code: 'uy',
    name: 'Uruguay',
    prefix: '/uruguay',
    spec: uySpec,
  },
  {
    code: 'mx',
    name: 'México',
    prefix: '/mexico',
    spec: mxSpec,
  },
  {
    code: 'bo',
    name: 'Bolivia',
    prefix: '/bolivia',
    spec: boSpec,
  },
  {
    code: 'br',
    name: 'Brasil',
    prefix: '/brasil',
    spec: brSpec,
  },
  {
    code: 'co',
    name: 'Colombia',
    prefix: '/colombia',
    spec: coSpec,
  },
]

const currentRegion = ref(regions.find(region => region.default))

export function useRegion() {
  function setCurrentRegion(regionCode) {
    currentRegion.value = regions.find(region => region.code === regionCode)
  }

  async function onRegionChange(event, router) {
    const selected = regions.find(r => r.code === event.target.value)

    const goTo = `/docs${selected.prefix}/`
      .replace(/\/\//g, '/') // Replace double slashes

    setCurrentRegion(selected.code)

    const openapi = useOpenapi({ spec: selected.spec })

    await router.go(goTo)
  }

  return {
    regions,
    currentRegion,
    setCurrentRegion,
    onRegionChange,
  }
}

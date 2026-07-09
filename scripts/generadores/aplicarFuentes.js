import fs from 'node:fs'
import {
  aplicarFuentesASpec,
  fuentesPorRegion,
  rutasOpenapiPorRegion,
} from './fuentes.js'

function loadJSON(path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
}

export function init() {
  Object
    .entries(rutasOpenapiPorRegion)
    .forEach(([region, ruta]) => {
      const spec = loadJSON(ruta)
      aplicarFuentesASpec(spec, fuentesPorRegion[region])
      fs.writeFileSync(new URL(ruta, import.meta.url), `${JSON.stringify(spec, null, 2)}\n`)
      console.log(`Fuentes aplicadas: ${region}`)
    })
}

try {
  init()
}
catch (error) {
  console.error(error)
  process.salir(1)
}

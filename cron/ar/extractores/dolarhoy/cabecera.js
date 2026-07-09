import { interpretarDecimalConComa } from '@/utils/numeros.js'
import { obtenerFechaActualizacion } from './fechaActualizacion.js'

function obtenerValores($, href, titulo) {
  if (titulo) {
    const tituloLower = titulo.toLowerCase()
    const enlace = $('.titleText')
      .filter((_, elemento) => {
        const texto = $(elemento)
          .text()
          .trim()
          .toLowerCase()

        return texto === tituloLower
      })
      .first()

    if (enlace.length > 0) {
      const tituloElemento = enlace.parent()
      return tituloElemento.next('.values')
    }

    return $()
  }

  return $(`.title:has(a[href=${href}]) + .values`)
}

export function obtenerValorCompra($, href, titulo) {
  const valores = obtenerValores($, href, titulo)

  if (!valores || valores.length === 0) {
    return null
  }

  const valor = valores
    .find(`.compra .val`)
    .html()

  if (!valor) {
    return null
  }

  return interpretarDecimalConComa(valor)
}

export function obtenerValorVenta($, href, titulo) {
  const valores = obtenerValores($, href, titulo)

  if (!valores || valores.length === 0) {
    return null
  }

  const valor = valores
    .find(`.venta .val`)
    .html()

  if (!valor) {
    return null
  }

  return interpretarDecimalConComa(valor)
}

export {
  obtenerFechaActualizacion,
}

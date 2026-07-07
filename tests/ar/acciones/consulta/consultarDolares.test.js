import { expect, it } from 'vitest'
import { consultarDolares } from '@/ar/acciones/consulta/consultarDolares.js'
import { casas } from '@/ar/constantes.ar.js'

it('consulta dólares', async () => {
  const respuesta = await consultarDolares()

  expect(respuesta.length).toBeGreaterThan(0)

  expect(casas.length).toBeGreaterThan(0)

  expect(respuesta.length).toBe(casas.length)

  casas.forEach((casa) => {
    const dolarCasa = respuesta.find(
      dolar => dolar.casa === casa.identificador,
    )

    expect(dolarCasa).not.toBeNull()

    expect(dolarCasa.fechaActualizacion).not.toBeNull()

    expect(dolarCasa.venta).toBeGreaterThan(0)

    if (casa.permiteCompra)
      expect(dolarCasa.compra).toBeGreaterThan(0)
    else expect(dolarCasa.compra).toBeNull()
  })
}, {
  timeout: 10000,
})

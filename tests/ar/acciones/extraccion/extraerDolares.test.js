import { expect, it } from 'vitest'
import { extraerDolares } from '@/ar/acciones/extraccion/extraerDolares.js'
import { casas } from '@/ar/constantes.ar.js'

it('extrae dólares', async () => {
  const dolares = await extraerDolares()

  const casasNoCalculadas = casas.filter(casa => !casa.calculado)

  expect(dolares.length).toBeGreaterThan(0)

  expect(casasNoCalculadas.length).toBeGreaterThan(0)

  expect(dolares.length).toBe(casasNoCalculadas.length)

  casasNoCalculadas.forEach((casa) => {
    const dolarCasa = dolares.find(dolar => dolar.casa === casa.identificador)

    expect(dolarCasa).not.toBeNull()

    expect(dolarCasa.moneda).toBe('USD')
    expect(dolarCasa.casa).toBe(casa.identificador)
    if (casa.permiteCompra)
      expect(dolarCasa.compra).toBeGreaterThan(0)
    else
      expect(dolarCasa.compra).toBeNull()
    expect(dolarCasa.venta).toBeGreaterThan(0)
    expect(dolarCasa.fechaActualizacion).not.toBeNull()
  })
})

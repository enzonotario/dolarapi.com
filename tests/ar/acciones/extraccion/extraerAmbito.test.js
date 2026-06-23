import { expect, it } from 'vitest'
import { extraerAmbito } from '@/ar/acciones/extraccion/extraerAmbito.esjs'
import { casasAmbito } from '@/ar/constantes.ar.esjs'

it('extrae ambito', async () => {
  const dolares = await extraerAmbito()

  expect(dolares.length).toBeGreaterThan(0)

  expect(casasAmbito.length).toBeGreaterThan(0)

  expect(dolares.length).toBe(casasAmbito.length)

  casasAmbito.forEach((casa) => {
    const dolarCasa = dolares.find(dolar => dolar.casa === casa.identificador)

    expect(dolarCasa).not.toBeNull()

    expect(dolarCasa.moneda).toBe('USD')
    expect(dolarCasa.casa).toBe(casa.identificador)
    if (casa.permiteCompra)
      expect(dolarCasa.compra).toBeGreaterThan(0)
    else
      expect(dolarCasa.compra).toBeNull()
    expect(dolarCasa.venta).toBeGreaterThan(0)
    expect(dolarCasa.variacion).toBeDefined()
    if (dolarCasa.variacion !== null) {
      expect(typeof dolarCasa.variacion).toBe('number')
    }
    expect(dolarCasa.fechaActualizacion).not.toBeNull()
  })
}, 20000)

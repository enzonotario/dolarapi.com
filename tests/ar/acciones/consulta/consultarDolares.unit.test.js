import { describe, expect, it } from 'vitest'
import {
  calcularDolarTarjeta,
  dolarOficialDesdeBna,
} from '@/ar/acciones/consulta/consultarDolares.esjs'

describe('consultarDolares', () => {
  it('usa el dólar BNA de ámbito como oficial', () => {
    const oficial = dolarOficialDesdeBna([
      {
        moneda: 'USD',
        casa: 'oficial',
        nombre: 'Oficial',
        compra: 1434.94,
        venta: 1486.5,
        fechaActualizacion: new Date('2026-06-23T11:48:00.000Z'),
      },
      {
        moneda: 'USD',
        casa: 'bna',
        nombre: 'BNA',
        compra: 1440,
        venta: 1490,
        fechaActualizacion: new Date('2026-06-23T13:05:00.000Z'),
      },
    ])

    expect(oficial).toBeDefined()
    expect(oficial.casa).toBe('oficial')
    expect(oficial.nombre).toBe('Oficial')
    expect(oficial.compra).toBe(1440)
    expect(oficial.venta).toBe(1490)
    expect(oficial.fechaActualizacion).toEqual(
      new Date('2026-06-23T13:05:00.000Z'),
    )
  })

  it('calcula el dólar tarjeta a partir del BNA', () => {
    const oficial = dolarOficialDesdeBna([
      {
        moneda: 'USD',
        casa: 'bna',
        nombre: 'BNA',
        compra: 1000,
        venta: 1100,
        fechaActualizacion: new Date('2026-06-23T13:05:00.000Z'),
      },
    ])

    const tarjeta = calcularDolarTarjeta(oficial)

    expect(tarjeta.casa).toBe('tarjeta')
    expect(tarjeta.compra).toBe(1300)
    expect(tarjeta.venta).toBe(1430)
  })
})

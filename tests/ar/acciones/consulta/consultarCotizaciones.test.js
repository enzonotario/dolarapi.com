import { expect, it } from 'vitest'
import { consultarCotizaciones } from '@/ar/acciones/consulta/consultarCotizaciones.js'
import { monedasSoportadas } from '@/ar/constantes.ar.js'

it('consulta cotizaciones', async () => {
  const respuesta = await consultarCotizaciones()

  for (const moneda of monedasSoportadas) {
    const cotizacionMoneda = respuesta.find(
      cotizacion => cotizacion.moneda === moneda,
    )

    expect(cotizacionMoneda).toMatchObject({
      moneda,
      casa: 'oficial',
      nombre: expect.any(String),
      fechaActualizacion: expect.any(Date),
      compra: expect.any(Number),
      venta: expect.any(Number),
    })

    expect(cotizacionMoneda).not.toBeNull()
    expect(cotizacionMoneda.fechaActualizacion).not.toBeNull()
    expect(cotizacionMoneda.compra).toBeGreaterThan(0)
    expect(cotizacionMoneda.venta).toBeGreaterThan(0)
  }
}, {
  timeout: 10000,
})

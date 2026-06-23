import { expect, it } from 'vitest'
import { unificar } from '@/utils/unificar.esjs'

it('unifica json1 con json2 por casa', async () => {
  const json1 = [
    {
      casa: 'oficial',
      fechaActualizacion: '2020-01-01',
      compra: 1,
      venta: 1,
    },
    {
      casa: 'blue',
      fechaActualizacion: '2020-01-01',
      compra: 2,
      venta: 2,
    },
  ]

  const json2 = [
    {
      casa: 'oficial',
      fechaActualizacion: '2020-01-02',
      compra: 0,
      venta: 2,
    },
    {
      casa: 'blue',
      fechaActualizacion: '2020-01-02',
      compra: 3,
      venta: 0,
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta).toEqual([
    {
      casa: 'oficial',
      fechaActualizacion: '2020-01-02',
      compra: 1,
      venta: 2,
    },
    {
      casa: 'blue',
      fechaActualizacion: '2020-01-02',
      compra: 3,
      venta: 2,
    },
  ])
})

it('unifica json1 con json2 por moneda', async () => {
  const json1 = [
    {
      moneda: 'USD',
      fechaActualizacion: '2020-01-01',
      compra: 1,
      venta: 1,
    },
    {
      moneda: 'EUR',
      fechaActualizacion: '2020-01-01',
      compra: 2,
      venta: 2,
    },
  ]

  const json2 = [
    {
      moneda: 'USD',
      fechaActualizacion: '2020-01-02',
      compra: 0,
      venta: 2,
    },
    {
      moneda: 'EUR',
      fechaActualizacion: '2020-01-02',
      compra: 3,
      venta: 0,
    },
  ]

  const respuesta = await unificar(json1, json2, 'moneda')

  expect(respuesta).toEqual([
    {
      moneda: 'USD',
      fechaActualizacion: '2020-01-02',
      compra: 1,
      venta: 2,
    },
    {
      moneda: 'EUR',
      fechaActualizacion: '2020-01-02',
      compra: 3,
      venta: 2,
    },
  ])
})

it('unifica variacion correctamente', async () => {
  const json1 = [
    {
      casa: 'oficial',
      compra: 1,
      venta: 1,
      variacion: -0.5,
    },
  ]

  const json2 = [
    {
      casa: 'oficial',
      compra: 2,
      venta: 2,
      variacion: 1.2,
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta[0].variacion).toBe(1.2)
})

it('preserva variacion cuando json2 no tiene', async () => {
  const json1 = [
    {
      casa: 'oficial',
      compra: 1,
      venta: 1,
      variacion: -0.5,
    },
  ]

  const json2 = [
    {
      casa: 'oficial',
      compra: 2,
      venta: 2,
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta[0].variacion).toBe(-0.5)
})

it('maneja variacion cero correctamente', async () => {
  const json1 = [
    {
      casa: 'oficial',
      compra: 1,
      venta: 1,
      variacion: -0.5,
    },
  ]

  const json2 = [
    {
      casa: 'oficial',
      compra: 2,
      venta: 2,
      variacion: 0,
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta[0].variacion).toBe(0)
})

it('preserva variacion cuando json2.variacion es null', async () => {
  const json1 = [
    {
      casa: 'oficial',
      compra: 1,
      venta: 1,
      variacion: -0.5,
    },
  ]

  const json2 = [
    {
      casa: 'oficial',
      compra: 2,
      venta: 2,
      variacion: null,
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta[0].variacion).toBe(-0.5)
})

it('agrega entradas nuevas de json2 con todos sus campos', async () => {
  const json1 = [
    {
      casa: 'oficial',
      moneda: 'USD',
      nombre: 'Oficial',
      compra: 1,
      venta: 1,
    },
  ]

  const json2 = [
    {
      casa: 'bna',
      moneda: 'USD',
      nombre: 'BNA',
      compra: 1440,
      venta: 1490,
      variacion: 0.68,
      fechaActualizacion: '2026-06-23T13:05:00.000Z',
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta).toEqual([
    {
      casa: 'oficial',
      moneda: 'USD',
      nombre: 'Oficial',
      compra: 1,
      venta: 1,
    },
    {
      casa: 'bna',
      moneda: 'USD',
      nombre: 'BNA',
      compra: 1440,
      venta: 1490,
      variacion: 0.68,
      fechaActualizacion: '2026-06-23T13:05:00.000Z',
    },
  ])
})

it('ignora entradas sin clave de unificación en el cache', async () => {
  const json1 = [
    {
      compra: 1440,
      venta: 1490,
      variacion: 0.68,
      fechaActualizacion: '2026-06-23T13:30:00.000Z',
    },
  ]

  const json2 = [
    {
      casa: 'bna',
      moneda: 'USD',
      nombre: 'BNA',
      compra: 1440,
      venta: 1490,
      variacion: 0.68,
      fechaActualizacion: '2026-06-23T16:35:00.000Z',
    },
  ]

  const respuesta = await unificar(json1, json2, 'casa')

  expect(respuesta).toEqual([
    {
      casa: 'bna',
      moneda: 'USD',
      nombre: 'BNA',
      compra: 1440,
      venta: 1490,
      variacion: 0.68,
      fechaActualizacion: '2026-06-23T16:35:00.000Z',
    },
  ])
})

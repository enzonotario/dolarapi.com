import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'
import { extraerInvertirOnline } from '@/ar/acciones/extraccion/extraerInvertirOnline.js'

vi.mock('axios')

describe('extraerInvertirOnline', () => {
  it('returns correct exchange rates for valid response', async () => {
    const mockResponse = `
      <table id="cotizaciones">
        <tbody>
          <tr>
            <td>Dolar Banco Nación</td>
            <td>100,00</td>
            <td>105,00</td>
            <td>01/01/2023 12:00:00</td>
          </tr>
        </tbody>
      </table>
    `
    axios.mockResolvedValue({ data: mockResponse })

    const result = await extraerInvertirOnline()

    expect(result).toEqual([
      {
        monedaNombre: 'Dolar Banco Nación',
        moneda: 'USD',
        compra: 100,
        venta: 105,
        fechaActualizacion: new Date(2023, 0, 1, 12, 0, 0),
      },
    ])
  })

  it('returns empty array when no matching currency is found', async () => {
    const mockResponse = `
      <table id="cotizaciones">
        <tbody>
          <tr>
            <td>Unknown Currency</td>
            <td>100,00</td>
            <td>105,00</td>
            <td>01/01/2023 12:00:00</td>
          </tr>
        </tbody>
      </table>
    `
    axios.mockResolvedValue({ data: mockResponse })

    const result = await extraerInvertirOnline()

    expect(result).toEqual([])
  })

  it('handles errors from axios gracefully', async () => {
    axios.mockRejectedValue(new Error('Network Error'))

    const result = await extraerInvertirOnline()

    expect(result).toEqual([])
  })
})

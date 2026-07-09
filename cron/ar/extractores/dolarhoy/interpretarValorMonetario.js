export function interpretarValorMonetario(valor) {
  return Number(valor.replace(/[^0-9.-]+/g, ''))
}

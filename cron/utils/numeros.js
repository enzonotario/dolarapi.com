import parseDecimalNumber from 'parse-decimal-number';

export function interpretarDecimalConComa(valor) {
    valor = valor.replace('$', ''); // Quitar el signo de pesos.
    return parseDecimalNumber(valor, '.,');
}


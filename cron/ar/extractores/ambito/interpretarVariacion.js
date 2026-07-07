export function interpretarVariacion(valor) {
    if (!valor || valor === 'S/C') {
        return null;
    }

    const resultado = Number(valor
        .replace('%', '')
        .replace(',', '.'));

    return isNaN(resultado) ? null : resultado;
}


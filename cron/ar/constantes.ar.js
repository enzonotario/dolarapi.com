export const casas = [{
  identificador: 'oficial',
  nombre: 'Oficial',
  permiteCompra: true,
}, {
  identificador: 'blue',
  nombre: 'Blue',
  permiteCompra: true,
}, {
  identificador: 'bolsa',
  nombre: 'Bolsa',
  permiteCompra: true,
}, {
  identificador: 'contadoconliqui',
  nombre: 'Contado con liquidación',
  permiteCompra: true,
}, {
  identificador: 'mayorista',
  nombre: 'Mayorista',
  permiteCompra: true,
}, {
  identificador: 'cripto',
  nombre: 'Cripto',
  permiteCompra: true,
}, {
  identificador: 'tarjeta',
  nombre: 'Tarjeta',
  permiteCompra: true,
  calculado: true,
}]

export const monedas = [{
  codigo: 'ARS',
  nombre: 'Peso Argentino',
  simbolo: '$',
}, {
  codigo: 'USD',
  nombre: 'Dólar',
  simbolo: '$',
}, {
  codigo: 'EUR',
  nombre: 'Euro',
  simbolo: '€',
}, {
  codigo: 'BRL',
  nombre: 'Real Brasileño',
  simbolo: 'R$',
}, {
  codigo: 'CLP',
  nombre: 'Peso Chileno',
  simbolo: '$',
}, {
  codigo: 'UYU',
  nombre: 'Peso Uruguayo',
  simbolo: '$',
}]

export const monedaPorDefecto = 'ARS'

export const monedasSoportadas = [
  'USD',
  'EUR',
  'BRL',
  'CLP',
  'UYU',
]

export const dolarHoy = {
  baseUrl: 'https://dolarhoy.com/',
  dolares: {
    oficial: {
      href: '/cotizaciondolaroficial',
      extractor: 'cabecera',
    },
    blue: {
      href: '/cotizaciondolarblue',
      extractor: 'cabecera',
    },
    bolsa: {
      href: '/cotizaciondolarbolsa',
      extractor: 'cabecera',
      titulo: 'DÓLAR MEP',
    },
    contadoconliqui: {
      href: '/cotizaciondolarcontadoconliqui',
      extractor: 'cabecera',
    },
    mayorista: {
      href: '/cotizaciondolarmayorista',
      extractor: 'pie',
    },
    cripto: {
      href: '/seccion/bitcoins',
      extractor: 'cabecera',
      titulo: 'Dólar Digital (USDC)',
    },
  },
  cotizaciones: {
    USD: {
      href: '/cotizaciondolaroficial',
      extractor: 'cabecera',
    },
    EUR: {
      href: '/cotizacion-euro',
      extractor: 'pie',
    },
    BRL: {
      href: '/cotizacion-real-brasileno',
      extractor: 'pie',
    },
    CLP: {
      href: '/cotizacion-peso-chileno',
      extractor: 'pie',
    },
    UYU: {
      href: '/cotizacion-peso-uruguayo',
      extractor: 'pie',
    },
  },
}

export const ambito = {
  baseUrl: 'https://www.ambito.com/contenidos/dolar.html',
  dolares: {
    oficial: {
      url: 'https://mercados.ambito.com//dolar/oficial/variacion',
    },
    blue: {
      url: 'https://mercados.ambito.com//dolar/informal/variacion',
    },
    bolsa: {
      url: 'https://mercados.ambito.com//dolarrava/mep/variacion',
    },
    contadoconliqui: {
      url: 'https://mercados.ambito.com//dolarrava/cl/variacion',
    },
    mayorista: {
      url: 'https://mercados.ambito.com//dolar/mayorista/variacion',
    },
    tarjeta: {
      url: 'https://mercados.ambito.com//dolarturista/variacion',
    },
    cripto: {
      url: 'https://mercados.ambito.com//dolarcripto/variacion',
    },
    bna: {
      url: 'https://mercados.ambito.com//dolarnacion/variacion',
    },
  },
}

export const casaBnaAmbito = {
  identificador: 'bna',
  nombre: 'BNA',
  permiteCompra: true,
}

export const casasAmbito = [
  ...casas.filter(casa => ambito.dolares[casa.identificador]),
  casaBnaAmbito,
]

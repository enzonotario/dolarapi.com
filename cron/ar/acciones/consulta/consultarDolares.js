import {extraerDolares as extraerDolarHoy} from '@/ar/acciones/extraccion/extraerDolares.js';
import {leerRuta} from '@/utils/rutas.js';
import {unificar} from '@/utils/unificar.js';
import {consultarAmbito} from '@/ar/acciones/consulta/consultarAmbito.js';
import tryToCatch from 'try-to-catch';
import {grupo, logError} from '@/log.js';

async function nuevosValores() {
    const log = grupo({
        cron: 'cron.ar.js',
        accion: 'consultarDolares',
    });
    
    const [errorDolarHoy, dolaresNoCalculados] = await tryToCatch(extraerDolarHoy);
    
    if (errorDolarHoy) {
        logError(log, errorDolarHoy, {
            extractor: 'extraerDolarHoy',
        });
    }
    
    const [errorAmbito, dolaresAmbito] = await tryToCatch(consultarAmbito);
    
    if (errorAmbito) {
        logError(log, errorAmbito, {
            extractor: 'consultarAmbito',
        });
    }
    
    const dolaresMayoristaAmbito = (dolaresAmbito || [])
        .filter((dolar) => dolar.casa === 'mayorista')
        .map(normalizarDolar);
    
    const dolarOficial = dolarOficialDesdeBna(dolaresAmbito);
    
    const dolares = [
        ...(dolarOficial ? [dolarOficial] : []),
        ...dolaresMayoristaAmbito,
        ...(dolaresNoCalculados || []).filter((dolar) => !['oficial', 'mayorista'].includes(dolar.casa)),
        ...(dolarOficial ? [calcularDolarTarjeta(dolarOficial)] : []),
    ];
    
    return dolares;
}

export function normalizarDolar(dolar) {
    return {
        moneda: dolar.moneda,
        casa: dolar.casa,
        nombre: dolar.nombre,
        compra: dolar.compra,
        venta: dolar.venta,
        fechaActualizacion: dolar.fechaActualizacion,
    };
}

export function dolarOficialDesdeBna(dolaresAmbito) {
    const dolarBna = (dolaresAmbito || []).find((dolar) => dolar.casa === 'bna');
    
    if (!dolarBna) {
        return null;
    }
    
    return normalizarDolar({
        ...dolarBna,
        casa: 'oficial',
        nombre: 'Oficial',
    });
}

export function calcularDolarTarjeta(dolarOficial) {
    const impuestos = 0.3;
    
    const compra = Number((dolarOficial.compra * (1 + impuestos)).toFixed(2));
    
    const venta = Number((dolarOficial.venta * (1 + impuestos)).toFixed(2));
    
    return {
        moneda: dolarOficial.moneda,
        casa: 'tarjeta',
        nombre: 'Tarjeta',
        compra,
        venta,
        fechaActualizacion: dolarOficial.fechaActualizacion,
    };
}

export async function consultarDolares() {
    const valoresActuales = await leerRuta('/dolares');
    
    const valoresNuevos = await nuevosValores();
    
    const dolares = unificar(valoresActuales, valoresNuevos, 'casa');
    
    return dolares.map((dolar) => ['oficial', 'mayorista'].includes(dolar.casa) ? normalizarDolar(dolar) : dolar);
}


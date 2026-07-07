import {interpretarDecimalConComa} from '@/utils/numeros.js';
import {obtenerFechaActualizacion} from './fechaActualizacion.js';

function obtenerValores($, href, titulo) {
    if (titulo) {
        const tituloLower = titulo.toLowerCase();
        const enlace = $(`.cotizaciones_more a`)
            .filter((_, elemento) => {
            const texto = $(elemento)
                .text()
                .trim()
                .toLowerCase();

            return texto === tituloLower;
        })
            .first();

        if (enlace.length > 0) {
            return enlace;
        }

        return $();
    }

    return $(`.cotizaciones_more a[href=${href}]`);
}

export function obtenerValorCompra($, href, titulo) {
    const valores = obtenerValores($, href, titulo);

    if (!valores || valores.length === 0) {
        return null;
    }

    const valor = valores
        .find(`.compra`)
        .html();

    if (!valor) {
        return null;
    }

    return interpretarDecimalConComa(valor);
}

export function obtenerValorVenta($, href, titulo) {
    const valores = obtenerValores($, href, titulo);

    if (!valores || valores.length === 0) {
        return null;
    }

    const valor = valores
        .find(`.venta`)
        .html();

    if (!valor) {
        return null;
    }

    return interpretarDecimalConComa(valor);
}

export {
    obtenerFechaActualizacion,
};


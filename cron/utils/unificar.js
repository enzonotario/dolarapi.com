/**
 * Unifica los valores de dos json, el segundo json tiene prioridad sobre el
 * primero. Si el segundo json no tiene un valor, se toma el valor del primero.
 * @param json1
 * @param json2
 * @returns {Promise<*[]>}
 */
export function unificar(json1, json2, claveBusqueda = 'casa') {
    const respuesta = [];

    const claves = [...new Set([
            ...json1.map((item) => item[claveBusqueda]),
            ...json2.map((item) => item[claveBusqueda]),
        ])].filter((clave) => clave != null && clave !== '');

    claves.forEach((clave) => {
        const valor1 = json1.find((item) => item[claveBusqueda] === clave);

        const valor2 = json2.find((item) => item[claveBusqueda] === clave);

        if (!valor1) {
            respuesta.push({
                ...valor2,
            });
            return;
        }

        if (!valor2) {
            respuesta.push({
                ...valor1,
            });
            return;
        }

        const item = {
            ...valor1,
        };

        if (valor2.fechaActualizacion) {
            item.fechaActualizacion = valor2.fechaActualizacion;
        }

        if (valor2.compra > 0) {
            item.compra = valor2.compra;
        }

        if (valor2.venta > 0) {
            item.venta = valor2.venta;
        }

        if (valor2.variacion !== null && valor2.variacion !== undefined) {
            item.variacion = valor2.variacion;
        }

        respuesta.push(item);
    });

    return respuesta;
}


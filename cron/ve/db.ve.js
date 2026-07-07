import {
    asegurarDirectorio,
    abrirBD,
    asegurarTabla,
    prepararUpsert,
    ejecutarTransaccion,
    cerrarBD,
} from '@/utils/sqlite.js';

export function guardarCotizacionesVe(cotizaciones, rutaDb) {
    const directorio = './datos/ve';

    asegurarDirectorio(directorio);
    const db = abrirBD(rutaDb ? rutaDb : `${directorio}/ve.sqlite`);

    asegurarTabla(db, 'CREATE TABLE IF NOT EXISTS cotizaciones (moneda TEXT, fuente TEXT, nombre TEXT, compra REAL, venta REAL, promedio REAL, fechaActualizacion TEXT, PRIMARY KEY (moneda, fuente, fechaActualizacion))');
    const stmt = prepararUpsert(db, 'INSERT OR IGNORE INTO cotizaciones (moneda, fuente, nombre, compra, venta, promedio, fechaActualizacion) VALUES (@moneda, @fuente, @nombre, @compra, @venta, @promedio, @fechaActualizacion)');

    ejecutarTransaccion(db, stmt, cotizaciones);
    cerrarBD(db);

    return true;
}


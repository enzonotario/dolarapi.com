import {
    asegurarDirectorio,
    abrirBD,
    asegurarTabla,
    prepararUpsert,
    ejecutarTransaccion,
    cerrarBD,
} from '@/utils/sqlite.js';

export function guardarCotizacionesCo(cotizaciones) {
    const directorio = './datos/co';

    asegurarDirectorio(directorio);
    const db = abrirBD(`${directorio}/co.sqlite`);

    asegurarTabla(db, 'CREATE TABLE IF NOT EXISTS cotizaciones (moneda TEXT PRIMARY KEY, nombre TEXT, compra REAL, venta REAL, fechaActualizacion TEXT)');
    const stmt = prepararUpsert(db, 'INSERT INTO cotizaciones (moneda, nombre, compra, venta, fechaActualizacion) VALUES (@moneda, @nombre, @compra, @venta, @fechaActualizacion) ON CONFLICT(moneda) DO UPDATE SET nombre=excluded.nombre, compra=excluded.compra, venta=excluded.venta, fechaActualizacion=excluded.fechaActualizacion');

    ejecutarTransaccion(db, stmt, cotizaciones);
    cerrarBD(db);

    return true;
}


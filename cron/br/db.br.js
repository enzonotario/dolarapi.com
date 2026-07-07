import {
    asegurarDirectorio,
    abrirBD,
    asegurarTabla,
    prepararUpsert,
    ejecutarTransaccion,
    cerrarBD,
} from '@/utils/sqlite.js';

export function guardarCotizacionesBr(cotizaciones) {
    const directorio = './datos/br';

    asegurarDirectorio(directorio);
    const db = abrirBD(`${directorio}/br.sqlite`);

    asegurarTabla(db, 'CREATE TABLE IF NOT EXISTS cotacoes (moeda TEXT PRIMARY KEY, nome TEXT, compra REAL, venda REAL, fechoAnterior REAL, dataAtualizacao TEXT)');
    const stmt = prepararUpsert(db, 'INSERT INTO cotacoes (moeda, nome, compra, venda, fechoAnterior, dataAtualizacao) VALUES (@moeda, @nome, @compra, @venda, @fechoAnterior, @dataAtualizacao) ON CONFLICT(moeda) DO UPDATE SET nome=excluded.nome, compra=excluded.compra, venda=excluded.venda, fechoAnterior=excluded.fechoAnterior, dataAtualizacao=excluded.dataAtualizacao');

    ejecutarTransaccion(db, stmt, cotizaciones);
    cerrarBD(db);

    return true;
}


function _nullishCoalesce(lhs, rhsFn) {
    if (lhs != null) {
        return lhs;
    } else {
        return rhsFn();
    }
}

import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Database from 'better-sqlite3';
import {
    asegurarDirectorio,
    abrirBD,
    asegurarTabla,
    cerrarBD,
} from '../cron/utils/sqlite.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.join(__dirname, '..');
const directorioDatos = path.join(raiz, 'datos', 've');
const archivoBD = path.join(directorioDatos, 've.sqlite');
const desdeFecha = '2026-02-14';

function obtenerCommits() {
    const salida = execSync(`git log --since="${desdeFecha}" --format="%H" -- datos/ve/v1/`, {
        cwd: raiz,
        encoding: 'utf-8',
    });

    return salida
        .trim()
        .split('\n')
        .filter(Boolean);
}

function extraerJsonEnCommit(commit, ruta) {
    try {
        const salida = execSync(`git show ${commit}:${ruta}`, {
            cwd: raiz,
            encoding: 'utf-8',
        });

        return JSON.parse(salida);
    } catch {
        return null;
    }
}

function normalizarDolar(item) {
    return {
        moneda: 'USD',
        fuente: item.fuente,
        nombre: _nullishCoalesce(item.nombre, () => (item.fuente === 'oficial' ? 'Oficial' : 'Paralelo')),
        compra: _nullishCoalesce(item.compra, () => null),
        venta: _nullishCoalesce(item.venta, () => null),
        promedio: _nullishCoalesce(item.promedio, () => null),
        fechaActualizacion: _nullishCoalesce(item.fechaActualizacion, () => null),
    };
}

function normalizarEuro(item) {
    return {
        moneda: _nullishCoalesce(item.moneda, () => 'EUR'),
        fuente: item.fuente,
        nombre: _nullishCoalesce(item.nombre, () => (item.fuente === 'oficial' ? 'Euro' : 'Paralelo')),
        compra: _nullishCoalesce(item.compra, () => null),
        venta: _nullishCoalesce(item.venta, () => null),
        promedio: _nullishCoalesce(item.promedio, () => null),
        fechaActualizacion: _nullishCoalesce(item.fechaActualizacion, () => null),
    };
}

function extraerCotizacionesDeCommit(commit) {
    const dolares = extraerJsonEnCommit(commit, 'datos/ve/v1/dolares/index.json');
    const euros = extraerJsonEnCommit(commit, 'datos/ve/v1/euros/index.json');

    const cotizaciones = [];

    if (Array.isArray(dolares)) {
        dolares.forEach((d) => {
            if (d && d.promedio != null)
                cotizaciones.push(normalizarDolar(d));
        });
    }

    if (Array.isArray(euros)) {
        euros.forEach((e) => {
            if (e && e.promedio != null)
                cotizaciones.push(normalizarEuro(e));
        });
    }

    return cotizaciones;
}

function principal() {
    const commits = obtenerCommits().reverse();
    console.log(`Encontrados ${commits.length} commits desde ${desdeFecha}`);

    if (commits.length === 0) {
        console.log('No hay commits para procesar');
        return;
    }

    asegurarDirectorio(directorioDatos);
    const db = abrirBD(archivoBD);

    asegurarTabla(db, 'CREATE TABLE IF NOT EXISTS cotizaciones (moneda TEXT, fuente TEXT, nombre TEXT, compra REAL, venta REAL, promedio REAL, fechaActualizacion TEXT, PRIMARY KEY (moneda, fuente, fechaActualizacion))');

    const stmt = db.prepare(`INSERT OR IGNORE INTO cotizaciones (moneda, fuente, nombre, compra, venta, promedio, fechaActualizacion)
     VALUES (@moneda, @fuente, @nombre, @compra, @venta, @promedio, @fechaActualizacion)`);

    let total = 0;

    const insertar = db.transaction((filas) => {
        for (const fila of filas) {
            stmt.run(fila);
            total++;
        }
    });

    for (const commit of commits) {
        const cotizaciones = extraerCotizacionesDeCommit(commit);

        if (cotizaciones.length > 0)
            insertar(cotizaciones);
    }

    cerrarBD(db);

    console.log(`Insertadas ${total} filas en cotizaciones`);
}

principal();


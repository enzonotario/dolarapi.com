import fs from 'node:fs'

const datosDirectorio = './datos/v1'

export async function escribirRutaRegion(region, ruta, contenido) {
  const directorio = `./datos/${region}/v1/${ruta}`

  try {
    fs.mkdirSync(directorio, {
      recursive: true,
    })

    contenido = JSON.stringify(contenido, null, 2)

    fs.writeFileSync(`${directorio}/index.json`, contenido)

    return contenido
  }
  catch (error) {
    console.error(error)

    return false
  }
}

export async function leerRutaRegion(region, ruta) {
  if (ruta.startsWith('/')) {
    ruta = ruta.slice(1)
  }

  const directorio = `./datos/${region}/v1/${ruta}`

  try {
    const contenido = fs.readFileSync(`${directorio}/index.json`, 'utf8')

    return JSON.parse(contenido)
  }
  catch (error) {
    console.error(error)

    return null
  }
}

export async function escribirRuta(ruta, contenido) {
  const directorio = `${datosDirectorio}/${ruta}`

  try {
    fs.mkdirSync(directorio, {
      recursive: true,
    })

    contenido = JSON.stringify(contenido, null, 2)

    fs.writeFileSync(`${directorio}/index.json`, contenido)

    return contenido
  }
  catch (error) {
    console.error(error)

    return false
  }
}

export async function leerRuta(ruta) {
  if (ruta.startsWith('/')) {
    ruta = ruta.slice(1)
  }

  const directorio = `${datosDirectorio}/${ruta}`

  try {
    const contenido = fs.readFileSync(`${directorio}/index.json`, 'utf8')

    return JSON.parse(contenido)
  }
  catch (error) {
    console.error(error)

    return null
  }
}

import {parse} from 'date-fns';

export function obtenerFechaActualizacion($) {
    const texto = $('.update')
        .text()
        .split('Actualizado por última vez: ')[1]
        .trim();

    return parse(texto + ' -03', 'dd/MM/yy hh:mm aa x', new Date());
}


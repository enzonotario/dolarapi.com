import {parse} from 'date-fns';

export function interpretarFecha(valor) {
    return parse(valor, 'dd/MM/yyyy - HH:mm', new Date());
}


import {Estudiante} from './estudiante.model';

export class Resultado {
    id?: number;
    valor: string;
    tipo: string;
    estado: string;

    constructor() {
        this.valor = '';
        this.tipo = 'CUANTITATIVA';
        this.estado = 'ACTIVO';
    }
}

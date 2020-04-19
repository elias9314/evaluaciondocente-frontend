import {Estudiante} from './estudiante.model';
import {DocenteAsignatura} from './docente-asignatura.model';
export class Resultado {
    id?: number;
    valor: string;
    tipo: string;
    estado: string;
    docenteAsignatura: DocenteAsignatura;
    eva_pregunta_eva_respuesta: string;
    constructor() {
        this.valor = '';
        this.tipo = 'CUANTITATIVA';
        this.estado = 'ACTIVO';
    }
}

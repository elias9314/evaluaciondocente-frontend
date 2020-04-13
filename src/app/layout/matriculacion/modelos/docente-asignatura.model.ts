import {Estudiante} from './estudiante.model';
import {Asignatura} from './asignatura.model';
import {PeriodoLectivo} from './periodo-lectivo.model';
export class DocenteAsignatura {

    docente?: any;
    id?: number;
    paralelo: string;
    jornada: string;
    tipo: string;
    estado: string;
    autoevaluacion: boolean;
    docente_id(docente_id: any) {
        throw new Error ('Method not implemented.');
    }

    constructor() {
        this.estado = 'ACTIVO';
        this.tipo = '';
    }
}

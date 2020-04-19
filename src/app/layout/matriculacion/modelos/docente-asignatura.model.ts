import {Estudiante} from './estudiante.model';
import {Asignatura} from './asignatura.model';

import{PeriodoLectivo} from './periodo-lectivo.model'
export class DocenteAsignatura {
    // docente_id(docente_id: any) {
    //     throw new Error("Method not implemented.");
    // }
    // docente?: any;
    id: string;
    paralelo: string;
    jornada: string;
    tipo: string;
    estado: string;
    autoevaluacion:boolean;

    constructor() {
        this.estado = 'ACTIVO';
        this.tipo = '';
    }
}

import {Matricula} from './matricula.model';
import {Asignatura} from './asignatura.model';
import {TipoMatricula} from './tipo-matricula.model';
import {Estudiante} from './estudiante.model';

export class AsignaturaMatricula {
    idAsignatura(idAsignatura: any) {
        throw new Error("Method not implemented.");
    }
    user_id(user_id: any) {
        throw new Error("Method not implemented.");
    }
    idDocenteAsignatura(idDocenteAsignatura: any) {
        throw new Error("Method not implemented.");
    }
    estudiante_id(estudiante_id: any) {
        throw new Error("Method not implemented.");
    }
    docente?:any;
    id?: number;
    codigo: string;
    nombre: string;
    paralelo: string;
    jornada: string;
    estado_evaluacion: string;

    constructor() {
        this.jornada = '';
        this.paralelo = '';
        this.estado_evaluacion = '';
    }
}

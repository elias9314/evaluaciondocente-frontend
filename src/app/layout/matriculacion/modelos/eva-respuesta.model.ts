import {PeriodoAcademico} from './periodo-academico.model';
import {Malla} from './malla.model';
import {EvaPregunta} from './eva-pregunta.model';
import {Estudiante} from './estudiante.model';

export class EvaRespuesta {
    id?: number;
    codigo: string;
    orden: number;
    nombre: string;
    tipo: string;
    valor: string;
    estado: string;


    constructor() {
        this.codigo = '';
        this.tipo = '';
    }
}

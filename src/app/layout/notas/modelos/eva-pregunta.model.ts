
import { TipoEvaluacion } from '../../matriculacion/modelos/tipo-evaluacion.model';
export class EvaPregunta {
    id?: number;
    tipo_evaluacion: TipoEvaluacion;
    codigo: string;
    orden: number;
    nombre: string;
    tipo: string;
    cantidad_respuestas: number;
    estado: string;

    constructor() {
        this.id = 0;
        this.tipo_evaluacion = new TipoEvaluacion();
        this.codigo = '';
        this.orden = 0;
        this.nombre = '';
        this.tipo = '';
        this.estado = '';
      }
}


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
      this.tipo_evaluacion = new TipoEvaluacion();
      }
}

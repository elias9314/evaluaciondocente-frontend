import { EvaPregunta } from '../../notas/modelos/eva-pregunta.model';
import { EvaRespuesta } from '../../matriculacion/modelos/eva-respuesta.model';

export class PreguntaRespuesta {
 id?: number;
 orden: number;
 eva_pregunta: EvaPregunta;
 eva_respuesta: EvaRespuesta;
 constructor() {
     this.eva_pregunta = new EvaPregunta();
     this.eva_respuesta = new EvaRespuesta();
 }
}

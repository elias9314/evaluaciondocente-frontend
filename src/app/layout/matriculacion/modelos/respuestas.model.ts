import { EvaRespuesta } from './eva-respuesta.model';
import {EvaPregunta} from '../../notas/modelos/eva-pregunta.model';

export class Respuestas {
        id?: number;
        orden: number;
        eva_pregunta: EvaPregunta;
        eva_respuesta: EvaRespuesta;


    constructor() {
        this.eva_pregunta = new EvaPregunta;
        this.eva_respuesta = new EvaRespuesta;
    }

}

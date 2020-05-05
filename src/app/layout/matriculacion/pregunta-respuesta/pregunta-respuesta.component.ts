import { Respuestas } from './../modelos/respuestas.model';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { EvaPregunta } from '../../notas/modelos/eva-pregunta.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EvaPregunta } from '../modelos/eva-pregunta.model';
import { EvaRespuesta } from '../modelos/eva-respuesta.model';


@Component({
  selector: 'app-pregunta-respuesta',
  templateUrl: './pregunta-respuesta.component.html',
  styleUrls: ['./pregunta-respuesta.component.scss']
})
export class PreguntaRespuestaComponent implements OnInit {
    preguntas: Array<Respuestas>;
    preguntaSeleccionada: Respuestas;
    pregunta: Respuestas;
    // respuestas: any;
    // resultados: any;
    tablas: any;
    Preguntas: Array<EvaPregunta>;
    Respuestas: Array<EvaRespuesta>;
  constructor(private spinner: NgxSpinnerService,
    private service: ServiceService,
    private modalService: NgbModal,
    private http: HttpClient) { }

  ngOnInit() {
      this.getEvaPreguntas();
      this.getEvaRespuestas();
      this.preguntas = new Array<Respuestas>();
      this.pregunta = new Respuestas();
      this.preguntaSeleccionada = new Respuestas();
      console.log(this.preguntas);
      console.log(this.preguntaSeleccionada);
  }

getEvaPreguntas() {
    this.service.get('evaluacion_preguntas').subscribe(response => {
        this.Preguntas = response['preguntas'];
        console.log(this.Preguntas);
    });
}
getEvaRespuestas() {
    this.service.get('eva_respuestas').subscribe(response => {
        this.Respuestas = response['respuesta'];
        console.log(this.Respuestas);
    });
}

crear() {
    console.log(this.preguntaSeleccionada.orden);
    console.log(this.preguntaSeleccionada.eva_pregunta);
    console.log(this.preguntaSeleccionada.eva_respuesta);
    this.tablas = {'orden': this.preguntaSeleccionada.orden,
    'eva_pregunta': {'id': this.preguntaSeleccionada.eva_pregunta},
    'eva_respuesta': {'id': this.preguntaSeleccionada.eva_respuesta}};
    this.spinner.show();
            this.service
                .post('pregunta_respuesta', {
                    eva_pregunta_eva_respuesta: this.tablas
                })
                .subscribe(
                    (response) => {
                        this.spinner.hide();
                        this.preguntaSeleccionada = new Respuestas();
                        console.log('creado');
                        // this.getEvaPregunta();
                        // this.router.navigate(['eva-pregunta']);
                    },
                    (Error) => {
                        this.spinner.hide();
                        console.log('error');
                    }
                );
}


}

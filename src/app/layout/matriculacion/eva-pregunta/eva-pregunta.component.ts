import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {EvaPregunta} from '../../notas/modelos/eva-pregunta.model';
import { TipoEvaluacion } from '../../matriculacion/modelos/tipo-evaluacion.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'util';
@Component({
  selector: 'app-eva-pregunta',
  templateUrl: './eva-pregunta.component.html',
  styleUrls: ['./eva-pregunta.component.scss']
})
export class EvaPreguntaComponent implements OnInit {
  preguntas: Array<EvaPregunta>;
  preguntaSeleccionada: EvaPregunta;
  pregunta: EvaPregunta;
<<<<<<< HEAD
  p = 2;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService) { }
=======
  tipos: Array<TipoEvaluacion>;
  p = 1;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal) { }
>>>>>>> 2fe11d07ad7bed57032f050ab891ba61e22ba377

  ngOnInit() {
    this.getEvaPregunta();
    this.getTipo();
    this.preguntas = new Array<EvaPregunta>();
    this.pregunta = new EvaPregunta();
    this.preguntaSeleccionada = new EvaPregunta();
  }
//////////// método para traer una lista de preguntas de evaluación docentes ///////////////
  getEvaPregunta() {
    this.spinner.show();
    this.service.get('evaluacion_preguntas').subscribe(
      response => {
        this.preguntas = response['preguntas'];
         console.log(response);
        this.spinner.hide();
                 },
    Error => {
        this.spinner.hide();
        console.log('error');
              });
        }

  getTipo() {
    this.spinner.show();
    this.service.get('tipo_evaluaciones').subscribe(
      response => {
        this.tipos = response['tipo'];
        console.log(response);
        this.spinner.hide();
                 },
    Error => {
        this.spinner.hide();
        console.log('error');
              });
  }
/////////////// método para crear una pregunta de evaluación docente ////////////////
createEvaPregunta() {
  this.spinner.show();

  this.service.post('evaluacion_pregunta', {'eva_preguntas': this.preguntaSeleccionada}).subscribe(
    response => {
      this.getEvaPregunta();
      console.log(response);
    },
    Error => {
      this.spinner.hide();
      console.log('error');
    }
  );
}
////////////// método para actualizar una pregunta de evaluación docente //////////////////

actualizarEvaPregunta(evapregunta: EvaPregunta) {
this.spinner.show();
console.log({'eva_pregunta': evapregunta});

this.service.update('evaluacion_preguntas', {'eva_pregunta': evapregunta}).subscribe(
  response => {
console.log(response);

    this.getEvaPregunta();
  },
  Error => {
    this.spinner.hide();
    console.log('error');
  }
);
}
///////////// método que permite actualizar o crear dependiendo de lo que eliga el cliente ////////////

modalEvaPregunta(content, evapregunta) {
  if (evapregunta != null) {
    this.preguntaSeleccionada = evapregunta;
}
  this.modalService.open(content)
            .result
            .then((resultModal => {
                if (resultModal === 'save') {
                    if (evapregunta == null) {
                        this.createEvaPregunta();
                    } else {

                        this.actualizarEvaPregunta(evapregunta);
                    }
                     } else {
                      this.getEvaPregunta();
                  }
              }), (resultCancel => {
                  this.getEvaPregunta();
              }));
}
}

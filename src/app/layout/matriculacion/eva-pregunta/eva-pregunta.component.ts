import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {EvaPregunta} from '../../notas/modelos/eva-pregunta.model';
import { TipoEvaluacion } from '../../matriculacion/modelos/tipo-evaluacion.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'util';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-eva-pregunta',
  templateUrl: './eva-pregunta.component.html',
  styleUrls: ['./eva-pregunta.component.scss']
})
export class EvaPreguntaComponent implements OnInit {
  preguntas: Array<EvaPregunta>;
  preguntaSeleccionada: EvaPregunta;
  pregunta: EvaPregunta;
  p = 2;
  tipos: Array<TipoEvaluacion>;
  eva_preguntasForm: FormGroup;
  FormBuilder: any;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEvaPregunta();
    this.getTipo();
    this.preguntas = new Array<EvaPregunta>();
    this.pregunta = new EvaPregunta();
    this.preguntaSeleccionada = new EvaPregunta();
    this.formmularioPreguntas();
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
formmularioPreguntas() {
    return this.eva_preguntasForm = new FormGroup({
        evaluacion: new FormControl ('', [Validators.required]),
        codigo: new FormControl('', [Validators.required, Validators.pattern('^([0-9])*$')]),
        orden: new FormControl('', [Validators.required, Validators.pattern('^([0-9])*$')]),
        preguntanombre: new FormControl('', [Validators.required]),
        tipopregunta: new FormControl('', [Validators.required]),
        estado: new FormControl('', [Validators.required]),
    });
}
get evaluacion() {return this.eva_preguntasForm.get('evaluacion'); }
get codigo() {return this.eva_preguntasForm.get('codigo'); }
get orden() {return this.eva_preguntasForm.get('orden'); }
get preguntanombre() {return this.eva_preguntasForm.get('preguntanombre'); }
get tipopregunta() {return this.eva_preguntasForm.get('tipopregunta'); }
get estado() {return this.eva_preguntasForm.get('estado'); }
}

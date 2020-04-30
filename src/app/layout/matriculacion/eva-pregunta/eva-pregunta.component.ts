import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EvaPregunta } from '../../notas/modelos/eva-pregunta.model';
import { TipoEvaluacion } from '../../matriculacion/modelos/tipo-evaluacion.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';
import { error } from 'util';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    FormControlName,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-eva-pregunta',
    templateUrl: './eva-pregunta.component.html',
    styleUrls: ['./eva-pregunta.component.scss'],
})
export class EvaPreguntaComponent implements OnInit {
    preguntas: Array<EvaPregunta>;
    preguntaSeleccionada: EvaPregunta;
    pregunta: EvaPregunta;
    p = 2;
    messages: any;
    tipos: Array<TipoEvaluacion>;
    eva_preguntasForm: FormGroup;
    FormBuilder: any;
    respuesta: any = [];
    validacion: any;
    validacion2: any;
    validacionUpdate: any;
    constructor(
        private spinner: NgxSpinnerService,
        private service: ServiceService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.getEvaPregunta();
        this.getTipo();
        this.preguntas = new Array<EvaPregunta>();
        this.pregunta = new EvaPregunta();
        this.preguntaSeleccionada = new EvaPregunta();
        this.messages = catalogos.messages;
        this.formmularioPreguntas();
    }
    //////////// método para traer una lista de preguntas de evaluación docentes ///////////////
    getEvaPregunta() {
        this.spinner.show();
        this.service.get('evaluacion_preguntas').subscribe(
            (response) => {
                this.preguntas = response['preguntas'];
                console.log(response);
                this.spinner.hide();
                // this.preguntas.forEach((result) => {
                //     this.respuesta.push(result.orden);
                //     // console.log(this.respuesta);
                //     // tslint:disable-next-line:triple-equals
                //     this.validacion = result.orden;
                //     // console.log(this.respuesta);
                //     // console.log(this.validacion);
                // });
            },
            (Error) => {
                this.spinner.hide();
                console.log('error');
            }
        );
    }

    getTipo() {
        this.spinner.show();
        this.service.get('tipo_evaluaciones').subscribe(
            (response) => {
                this.tipos = response['tipo'];
                console.log(response);
                this.spinner.hide();
            },
            (Error) => {
                this.spinner.hide();
                console.log('error');
            }
        );
    }

    /////////////// método para crear una pregunta de evaluaciónv docente ////////////////
    createEvaPregunta() {
        for (let i = 0; i < this.preguntas.length; i++) {
            if (this.preguntas[i].orden === this.preguntaSeleccionada.orden) {
                this.validacion = false;
            } else {
                    this.validacion = true;
            }
        }

        if (this.validacion) {
            this.spinner.show();
            this.service
                .post('evaluacion_pregunta', {
                    eva_preguntas: this.preguntaSeleccionada
                })
                .subscribe(
                    (response) => {
                        this.spinner.hide();
                        this.preguntaSeleccionada = new EvaPregunta();
                        swal.fire(this.messages['createSuccess']);
                        this.getEvaPregunta();
                        // this.router.navigate(['eva-pregunta']);
                    },
                    (Error) => {
                        this.spinner.hide();
                        console.log('error');
                    }
                );
        } else {
            Swal.fire(
                'error',
                'El registro orden esta duplicado por favor intente con otro numero',
                'error'
                //  'Something went wrong!'
            );
            this.preguntaSeleccionada = new EvaPregunta();
        }
        // window.location.reload();
    }
    ////////////// método para actualizar una pregunta de evaluación docente //////////////////

    actualizarEvaPregunta(evapregunta: EvaPregunta) {
        for (let i = 0; i < this.preguntas.length; i++) {
            if (this.preguntas[i].orden === this.preguntaSeleccionada.orden) {
                this.validacionUpdate = false;
            } else {
                    this.validacionUpdate = true;
            }
        }
        if (this.validacionUpdate) {
            console.log('actualizado exelente');
            this.spinner.show();
            console.log({ eva_pregunta: evapregunta });
            this.service
                .update('evaluacion_preguntas', { eva_pregunta: evapregunta })
                .subscribe(
                    (response) => {
                        this.spinner.hide();
                        console.log(response);
                        this.getEvaPregunta();
                    },
                    (Error) => {
                        this.spinner.hide();
                        console.log('error');
                    }
                );
        } else {
            Swal.fire(
                'error al actualizar',
                'El registro orden esta duplicado por favor intente con otro numero',
                'error'
                //  'Something went wrong!'
            );
            console.log('error al actualizar el orden esta duplicado');
        }
    }
    ///////////// método que permite actualizar o crear dependiendo de lo que eliga el cliente ////////////

    modalEvaPregunta(content, evapregunta) {
        if (evapregunta != null) {
            this.preguntaSeleccionada = evapregunta;
        }
        this.modalService.open(content).result.then(
            (resultModal) => {
                if (resultModal === 'save') {
                    if (evapregunta == null) {
                        this.createEvaPregunta();
                    } else {
                        this.actualizarEvaPregunta(evapregunta);
                    }
                } else {
                    this.getEvaPregunta();
                }
            },
            (resultCancel) => {
                this.getEvaPregunta();
            }
        );
    }
    abrirModalDocente(content, editar: boolean, evapregunta: EvaPregunta) {

        if (editar) {
          this.preguntaSeleccionada = evapregunta;
        } else {
          this.preguntaSeleccionada = new EvaPregunta();
        }

        this.modalService.open(content)
          .result
          .then((resultModal => {
            console.log(resultModal);
            if ( resultModal === 'save') {
              if (editar) {
                this.actualizarEvaPregunta(evapregunta);

               } else {
              this.createEvaPregunta();
              console.log('Excelente!!');
            }

            } else {

            }
          }), error => {
            console.log('error');
          });
        }


    formmularioPreguntas() {
        return (this.eva_preguntasForm = new FormGroup({
            evaluacion: new FormControl('', [Validators.required]),
            codigo: new FormControl('', [
                Validators.required,
                Validators.pattern('^([0-9])*$'),
            ]),
            orden: new FormControl('', [
                Validators.required,
                Validators.pattern('^([0-9])*$'),
            ]),
            preguntanombre: new FormControl('', [Validators.required]),
            tipopregunta: new FormControl('', [Validators.required]),
            estado: new FormControl('', [Validators.required]),
        }));
    }
    get evaluacion() {
        return this.eva_preguntasForm.get('evaluacion');
    }
    get codigo() {
        return this.eva_preguntasForm.get('codigo');
    }
    get orden() {
        return this.eva_preguntasForm.get('orden');
    }
    get preguntanombre() {
        return this.eva_preguntasForm.get('preguntanombre');
    }
    get tipopregunta() {
        return this.eva_preguntasForm.get('tipopregunta');
    }
    get estado() {
        return this.eva_preguntasForm.get('estado');
    }
}

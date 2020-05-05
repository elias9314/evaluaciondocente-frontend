import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName, FormGroupName } from '@angular/forms';
import Swal from 'sweetalert2';
import { EvaRespuesta} from '../modelos/eva-respuesta.model';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss']
})
export class RespuestasComponent implements OnInit {

  respuestas: Array<EvaRespuesta>;
  respuestaSeleccionada: EvaRespuesta;
  respuesta: EvaRespuesta;
  validacion: any;
  duplicado: any;
  respuestaForm: FormGroup;
  FormBuilder: any;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.getRespuestas();
    this.respuesta = new EvaRespuesta();
    this.respuestaSeleccionada = new EvaRespuesta();
    this.respuestas = new Array<EvaRespuesta>();
    this.formularioTipo();
  }
  // metodo para traer todas las respuestas de evaluaciones//////
  getRespuestas() {
    this.spinner.show();
    this.service.get('eva_respuestas').subscribe(
      response => {
        this.respuestas = response['respuesta'];
        console.log(response);
        this.spinner.hide();
                 },
    error => {
        this.spinner.hide();
        console.log('error');
              });
        }
  // metodo para insertar una nueva respuesta //////////
  postRespuesta() {
    for (let i = 0; i < this.respuestas.length; i++) {

        // tslint:disable-next-line:triple-equals
        if (this.respuestas[i].nombre == this.respuestaSeleccionada.nombre) {
            this.validacion = false;
        } else {
                this.validacion = true;
        }
    }
    if (this.validacion) {
            this.spinner.show();
            this.service.post('eva_respuestas', {'Respuesta': this.respuestaSeleccionada}).subscribe(
              response => {
                this.respuestaSeleccionada = new EvaRespuesta();
                this.getRespuestas();
                console.log(response);
              },
              error => {
                this.spinner.hide();
                console.log('error');
              }
            );
    } else {
        Swal.fire(
             'error',
             'El campo nombre esta duplicado por favor intente con otro numero',
             'error'
        );
        this.respuestaSeleccionada = new EvaRespuesta();
    }
}
/// metodo para actualizar un registro ////////
actualizarRespuesta(eva: EvaRespuesta) {
  for (let i = 0; i < this.respuestas.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.respuestas[i].nombre == this.respuestaSeleccionada.nombre) {
          this.duplicado = false;
      } else {
              this.duplicado = true;
      }
  }
  if (this.duplicado) {
      console.log('Exito!!');
      this.spinner.show();
      this.service.update('eva_respuestas', {'Respuesta': eva}).subscribe(
      response => {
         this.getRespuestas();
         console.log(response);
        },
        error => {
          this.spinner.hide();
          console.log('error');
        }
      );
  } else {
      Swal.fire(
          'error al guardar',
          'el campo nombre esta duplicado',
          'error'
      );
      console.log('error al guardar el campo nombre esta duplicado');
  }
}

/// modal para actualizar y crear un respuesta evaluaciones ////
agregarRespuesta(content, eva) {
  if (eva != null) {
    this.respuestaSeleccionada = eva;
}
  this.modalService.open(content)
            .result
            .then((resultModal => {
                if (resultModal === 'save') {
                    if (eva == null) {
                        this.postRespuesta();
                    } else {
                        this.actualizarRespuesta(eva);
                    }
                     } else {
                      this.getRespuestas();
                  }
              }), (resultCancel => {
                  this.getRespuestas();
              }));

      }

/// validaciones para formulario //////
formularioTipo() {
  return this.respuestaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('^([A-Za-z])*$')]),
      orden: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
  });
}
get nombre() {return this.respuestaForm.get('nombre'); }
get orden() {return this.respuestaForm.get('orden'); }
get estado() {return this.respuestaForm.get('estado'); }
get codigo() {return this.respuestaForm.get('codigo'); }
get valor() {return this.respuestaForm.get('valor'); }
get tipo() {return this.respuestaForm.get('tipo'); }
}

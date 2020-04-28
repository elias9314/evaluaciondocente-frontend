import { Component, OnInit } from '@angular/core';
import {TipoEvaluacion} from '../modelos/tipo-evaluacion.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName, FormGroupName } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-evaluacion',
  templateUrl: './tipo-evaluacion.component.html',
  styleUrls: ['./tipo-evaluacion.component.scss']
})
export class TipoEvaluacionComponent implements OnInit {
  tipoevaluaciones: Array<TipoEvaluacion>;
  tipoevaluacionSeleccionado: TipoEvaluacion;
  tipoevaluacion: TipoEvaluacion;
  tipoevaluacionForm: FormGroup;
  FormBuilder: any;
  respuesta: any = [];
  validacion: any;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getTipoEvaluacion();
    this.tipoevaluacion = new TipoEvaluacion();
    this.tipoevaluacionSeleccionado = new TipoEvaluacion();
    this.tipoevaluaciones = new Array<TipoEvaluacion>();
    this.formularioTipo();
  }

//////////// método para traer los tipo de evaluación/////////////
  getTipoEvaluacion() {
    this.spinner.show();
    this.service.get('tipo_evaluaciones').subscribe(
      response => {
        this.tipoevaluaciones = response['tipo'];
        console.log(response);
        this.spinner.hide();
        // console.log(this.tipoevaluaciones.length);
                 },
    error => {
        this.spinner.hide();
        console.log('error');
              });
        }
////////////////// método para ingresar un nuevo tipo de evaluación////////////////////////////
        postEvaluacion() {
            for (let i = 0; i < this.tipoevaluaciones.length; i++) {
                // tslint:disable-next-line:triple-equals
                if (this.tipoevaluaciones[i].evaluacion == this.tipoevaluacionSeleccionado.evaluacion) {
                    this.validacion = false;
                } else {
                        this.validacion = true;
                }
            }
            if (this.validacion) {
                // if (this.tipoevaluacionForm.valid) {
                    this.spinner.show();
                    this.service.post('tipo_evaluacion', {'tipo_evaluacion': this.tipoevaluacionSeleccionado}).subscribe(
                      response => {
                        this.tipoevaluacionSeleccionado = new TipoEvaluacion();
                        this.getTipoEvaluacion();
                        console.log(response);
                      },
                      error => {
                        this.spinner.hide();
                        console.log('error');
                      }
                    );
                //   } else {
                //       alert('Registros no validos');
                //   }
            } else {
                // alert ('El registro evaluacion esta duplicado porfavor intente con otro numero');
                Swal.fire(
                     'error',
                     'El registro evaluacion esta duplicado por favor intente con otro numero',
                     'error'
                    //  'Something went wrong!'
                );
                this.tipoevaluacionSeleccionado = new TipoEvaluacion();
            }
    }

//////////// método para editar un registro tipo de evaluación//////////////////////////////////
actualizarTipoEvaluacion(eva: TipoEvaluacion) {
   this.spinner.show();
   this.service.update('tipo_evaluaciones', {'tipo_evaluacion': eva}).subscribe(
   response => {
      this.getTipoEvaluacion();
      console.log(response);
     },
     error => {
       this.spinner.hide();
       console.log('error');
     }
   );
}

////////////////// método que permite actualizar o crear dependiendo de lo que eliga el cliente ////////////
agregarTipoEvaluacion(content, eva) {
  if (eva != null) {
    this.tipoevaluacionSeleccionado = eva;
}
  this.modalService.open(content)
            .result
            .then((resultModal => {
                if (resultModal === 'save') {
                    if (eva == null) {
                        this.postEvaluacion();
                    } else {
                        this.actualizarTipoEvaluacion(eva);
                    }
                     } else {
                      this.getTipoEvaluacion();
                  }
              }), (resultCancel => {
                  this.getTipoEvaluacion();
              }));

      }
      formularioTipo() {
          return this.tipoevaluacionForm = new FormGroup({
              nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([a-z])*$')]),
              evaluacion: new FormControl('', [Validators.required]),
              estado: new FormControl('', [Validators.required])
          });
      }
      get nombre() {return this.tipoevaluacionForm.get('nombre'); }
      get evaluacion() {return this.tipoevaluacionForm.get('evaluacion'); }
      get estado() {return this.tipoevaluacionForm.get('estado'); }
}
//////////////////////////////////////////////////////////

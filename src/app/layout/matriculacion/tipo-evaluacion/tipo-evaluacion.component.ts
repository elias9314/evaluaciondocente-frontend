import { Component, OnInit } from '@angular/core';
import {TipoEvaluacion} from '../modelos/tipo-evaluacion.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tipo-evaluacion',
  templateUrl: './tipo-evaluacion.component.html',
  styleUrls: ['./tipo-evaluacion.component.scss']
})
export class TipoEvaluacionComponent implements OnInit {
  tipoevaluaciones: Array<TipoEvaluacion>;
  tipoevaluacionSeleccionado: TipoEvaluacion;
  tipoevaluacion: TipoEvaluacion;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getTipoEvaluacion();
    this.tipoevaluacion = new TipoEvaluacion();
    this.tipoevaluacionSeleccionado = new TipoEvaluacion();
    this.tipoevaluaciones = new Array<TipoEvaluacion>();
  }

//////////// método para traer los tipo de evaluación/////////////
  getTipoEvaluacion() {
    this.spinner.show();
    this.service.get('tipo_evaluaciones').subscribe(
      response => {
        this.tipoevaluaciones = response['tipo'];
        console.log(response);
        this.spinner.hide();
                 },
    error => {
        this.spinner.hide();
        console.log('error');
              });
        }
////////////////// método para ingresar un nuevo tipo de evaluación////////////////////////////
        postEvaluacion() {
          this.spinner.show();
          this.service.post('tipo_evaluacion', {'tipo_evaluacion': this.tipoevaluacionSeleccionado}).subscribe(
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
}
//////////////////////////////////////////////////////////

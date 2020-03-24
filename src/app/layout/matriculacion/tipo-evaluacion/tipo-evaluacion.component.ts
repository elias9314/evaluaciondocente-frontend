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
  tipoevaluaciones: any;
  tipoevaluacion: TipoEvaluacion;
  listar: boolean;
  crear: boolean;
  modificar: boolean;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getTipoEvaluacion();
    this.tipoevaluacion = new TipoEvaluacion();
  }

  dataModel(dat: any) {
    return this.tipoevaluacion = dat;
  }


//////////// método para traer los tipo de evaluación/////////////
  getTipoEvaluacion() {
    // this.listar = true;
    // this.crear = false;
    this.modificar = false;
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
          this.service.post('tipo_evaluacion', {'tipo_evaluacion': this.tipoevaluacion}).subscribe(
            response => {
              this.tipoevaluacion = new TipoEvaluacion();
              this.getTipoEvaluacion();
              console.log(response);
            },
            error => {
              this.spinner.hide();
              this.tipoevaluacion = new TipoEvaluacion();
              console.log('error');
            }
          );
        }
/////////////////// método para los datos individuales al formulario para editar////////////////////

editarTipoEvaluacion(id) {
  this.listar = false;
  this.crear = false;
  this.modificar = true;
  this.service.get('tipo_evaluaciones/' + id).subscribe(
    response => {
      this.tipoevaluacion = response['tipo_evaluacion'];
      this.dataModel(this.tipoevaluacion[0]);
    },
    error => {
      console.log('error');
    }
  );
}
//////////// método para editar un registro tipo de evaluación//////////////////////////////////
actualizarTipoEvaluacion() {
   this.spinner.show();
   this.service.update('tipo_evaluaciones', {'tipo_evaluacion': this.tipoevaluacion}).subscribe(
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


agregarTipoEvaluacion(content) {
  /// this.listar = false;
// this.crear = true;
  this.modificar = false;
  this.modalService.open(content)
          .result
          .then((resultModal => {
              if (resultModal === 'save') {
                     this.postEvaluacion();
                    }
              }));
            }

  }
//////////////////////////////////////////////////////////

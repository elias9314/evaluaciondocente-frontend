import { Component, OnInit } from '@angular/core';
import {TipoEvaluacion} from '../modelos/tipo-evaluacion.model';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-tipo-evaluacion',
  templateUrl: './tipo-evaluacion.component.html',
  styleUrls: ['./tipo-evaluacion.component.scss']
})
export class TipoEvaluacionComponent implements OnInit {
  tipoevaluaciones: any = [];
  data: any;
  tipoevaluacion: TipoEvaluacion;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getTipoEvaluacion();
  }
  getTipoEvaluacion() {

    this.service.get('tipo_evaluaciones').subscribe(
      response => {
        this.tipoevaluaciones = response;
      },
      error => {
        console.log('error');
      }
    );
  }

}

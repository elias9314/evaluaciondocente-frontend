import { Component, OnInit } from '@angular/core';
import {TipoEvaluacion} from '../modelos/tipo-evaluacion.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-tipo-evaluacion',
  templateUrl: './tipo-evaluacion.component.html',
  styleUrls: ['./tipo-evaluacion.component.scss']
})
export class TipoEvaluacionComponent implements OnInit {
  tipoevaluaciones: any;

  tipoevaluacion: TipoEvaluacion;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService) { }

  ngOnInit() {
    this.getTipoEvaluacion();
  }

  getTipoEvaluacion() {
    this.spinner.show();
    this.service.get('tipo_evaluaciones').subscribe(
      response => {
        this.tipoevaluaciones = response;
        console.log(response);
        this.spinner.hide();
                 },
    error => {
        this.spinner.hide();
        console.log('error');
              });
        }
  }

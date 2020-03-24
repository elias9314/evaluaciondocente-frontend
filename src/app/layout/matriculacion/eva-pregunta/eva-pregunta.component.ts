import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {EvaPregunta} from '../modelos/eva-pregunta.model';
@Component({
  selector: 'app-eva-pregunta',
  templateUrl: './eva-pregunta.component.html',
  styleUrls: ['./eva-pregunta.component.scss']
})
export class EvaPreguntaComponent implements OnInit {
  preguntas: any;
  pregunta: EvaPregunta;
  p = 1;
  constructor(private spinner: NgxSpinnerService, private service: ServiceService) { }

  ngOnInit() {
    this.getEvaPregunta();
  }

  getEvaPregunta() {
    this.spinner.show();
    this.service.get('evaluacion_preguntas').subscribe(
      response => {
        this.preguntas = response['preguntas'];
         console.log(response);
        this.spinner.hide();
                 },
    error => {
        this.spinner.hide();
        console.log('error');
              });
        }
}

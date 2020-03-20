import { Component, OnInit } from '@angular/core';
import {EvaPregunta} from '../modelos/eva-pregunta.model';
import {Docente} from '../modelos/docente.model';
import {User} from '../modelos/user.model';
import {ServiceService} from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-perfil-docente',
  templateUrl: './perfil-docente.component.html',
  styleUrls: ['./perfil-docente.component.scss']
})
export class PerfilDocenteComponent implements OnInit {
  evaPreguntas: Array<any>;
  evaRespuestas: Array<any>;
  user:User;
  cantidadRespuestas: Array<number>;
  constructor (private spinner: NgxSpinnerService,private service: ServiceService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
        

    this.getDocente();

  }

  getDocente(){
   
  }


}

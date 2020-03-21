import { Component, OnInit } from '@angular/core';
import {Docente} from '../modelos/docente.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-admin-docentes',
  templateUrl: './admin-docentes.component.html',
  styleUrls: ['./admin-docentes.component.scss']
})
export class AdminDocentesComponent implements OnInit {
  docentes:any;
  docente:Docente;
  
  constructor(private spinner:NgxSpinnerService,private service:ServiceService){}

  ngOnInit() {
    this.getDocente();

  }

  getDocente(){
    this.spinner.show();
    this.service.get('docentes').subscribe(
      response=>{
        this.docentes=response;
        console.log(response);
        this.spinner.hide();
      },
      error=>{
        this.spinner.hide();
        console.log('error');

      });
  }


}

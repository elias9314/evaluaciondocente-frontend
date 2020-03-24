import { Component, OnInit } from '@angular/core';
import {Docente} from '../modelos/docente.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-docentes',
  templateUrl: './admin-docentes.component.html',
  styleUrls: ['./admin-docentes.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminDocentesComponent implements OnInit {
  docentes:any;
  docente:Docente;
  docenteSeleccionado:Docente;

  
  constructor(config: NgbModalConfig, private modalService: NgbModal,private spinner:NgxSpinnerService,private service:ServiceService){
    
  }
  actual_page: number;
    records_per_page: number;
    total_pages: number;
    total_register: number;
    total_pages_pagination: Array<any>;
    total_pages_temp: number;
    flagPagination: boolean;
  p: number= 1;
  messages: any;
  ngOnInit() {
    this.getDocente();
    this.messages = catalogos.messages;
    this.docenteSeleccionado= new Docente;

  }
  open(content) {
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if(resultModal === 'save'){
          this.crearDocente();
        }
      }));
  }

  getDocente(){
    this.total_pages = 1;
    this.crearNumerosPaginacion();
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
  crearDocente(){
    this.spinner.show();
    this.service.post('docentes',{'docentes': this.docenteSeleccionado}).subscribe(
        response =>{
          this.spinner.hide();
          this.docente= new Docente();
          console.log(response);
          //swal.fire(this.messages['createSuccess']);
        },
        error => {
          this.spinner.hide();
          if (error.error.errorInfo[0] === '23505') {
              //swal.fire(this.messages['error23505']);
          console.log('errors');

          } else {
          console.log('error');

            // swal.fire(this.messages['error500']);
          }
      });
  }

  updateDocente(docente: Docente) {
    this.spinner.show();
    this.service.update('docentes', {'docente': docente}).subscribe(
        response => {
            this.getDocente();
            this.spinner.hide();
            swal.fire(this.messages['updateSuccess']);
        },
        error => {
          this.spinner.hide();
              //swal.fire(this.messages['error23505']);
          console.log('errors');
      });
}

  
  crearNumerosPaginacion() {
    if (this.total_pages > 10) {
        for (let i = 0; i < 10; i++) {
            this.total_pages_pagination[i] = i + this.total_pages_temp - 9;
        }
    } else {
        this.total_pages_pagination = new Array<any>();
        for (let i = 0; i < this.total_pages; i++) {
            this.total_pages_pagination[i] = i + 1;
        }
    }
}

firstPagina() {
    this.getDocente();
    this.total_pages_temp = 10;
    this.crearNumerosPaginacion();
}

lastPagina() {
    this.getDocente();
    this.total_pages_temp = this.total_pages;
    this.crearNumerosPaginacion();
}

paginacion(siguiente: boolean) {
    if (siguiente) {
        if (this.actual_page === this.total_pages) {
            return;
        } else {
            if (this.total_pages_temp !== this.total_pages) {
                this.total_pages_temp++;
                this.crearNumerosPaginacion();
            }

            this.actual_page++;
        }
    } else {
        if (this.actual_page === 1) {
            return;
        } else {
            this.actual_page--;
            this.total_pages_temp--;
            this.crearNumerosPaginacion();
        }
    }
    this.getDocente();
}


}
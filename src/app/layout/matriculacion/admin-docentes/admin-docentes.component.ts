import { Component, OnInit } from '@angular/core';
import {Docente} from '../modelos/docente.model';
import { User} from '../modelos/user.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-docentes',
  templateUrl: './admin-docentes.component.html',
  styleUrls: ['./admin-docentes.component.scss'],
})
export class AdminDocentesComponent implements OnInit {
  docentes: Array<Docente>;
  docente: Docente;

  docenteSeleccionado: Docente;
  messages: any;
  usuario: User;
  buscador: string;

  usuarios: Array<User>;
  usuarioSeleccionado: User;
  actual_page: number;
  records_per_page: number;
  total_pages: number;
  total_register: number;
  total_pages_pagination: Array<any>;
  total_pages_temp: number;
  flagPagination: boolean;

  p = 1;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private spinner: NgxSpinnerService, private service: ServiceService) {
  }
  ngOnInit() {

    this.messages = catalogos.messages;
    this.docente = new Docente;
    this.docenteSeleccionado = new Docente();
    this.usuario = new User;
    this.usuarioSeleccionado = new User();
    this.flagPagination = true;
    this.total_pages_pagination = new Array<any>();
    this.total_pages_temp = 10;
    this.records_per_page = 6;
    this.actual_page = 1;
    this.total_pages = 1;
    this.getUsuarioDocentes(1);


  }

  getDocente() {
    this.spinner.show();
    this.service.get('docentes').subscribe(
      response => {
        this.docentes = response['profesor'];
        console.log(response);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log('error');

      });
  }

  getUsuarioDocentes(page: number) {
    this.spinner.show();
    this.actual_page = page;
    const parameters = '?' + 'records_per_page=' + this.records_per_page
            + '&page=' + page;
    this.service.get('usuarios' + parameters).subscribe(
        response => {
            this.docentes = response['usuarios']['data'];
            console.log(response);
            this.total_pages = response['pagination']['last_page'];
            this.total_register = response['pagination']['total'];
            this.crearNumerosPaginacion();
            this.spinner.hide();
        },
        error => {
            this.spinner.hide();
        }
    );
}
getUsuario() {
  this.total_pages = 1;
  this.crearNumerosPaginacion();
  this.buscador = this.buscador.toUpperCase();
  const parametros =
      '?buscador=' + this.buscador;
  this.spinner.show();
  this.service.get('usuarios/filter' + parametros).subscribe(
      response => {
          this.docentes = response['usuarios'];
          this.spinner.hide();
      },
      error => {
          this.spinner.hide();
      });
}

  // CREATE
  crearDocente() {
    this.docenteSeleccionado.user.user_name = this.docenteSeleccionado.identificacion;
    this.docenteSeleccionado.user.email = this.docenteSeleccionado.correo_institucional ;
    this.docenteSeleccionado.user.name = this.docenteSeleccionado.apellido1 + ' ' + this.docenteSeleccionado.nombre1;
    this.docenteSeleccionado.user.estado = this.docenteSeleccionado.estado ;

    console.log(this.docenteSeleccionado);
    this.spinner.show();
    this.service.post('usuarios', {'usuario': this.docenteSeleccionado.user, 'docente': this.docenteSeleccionado}).subscribe(
        response => {
          this.spinner.hide();
          // this.getDocente();
         // console.log(response);
          swal.fire(this.messages['createSuccess']);
        },
        error => {
          this.spinner.hide();
          console.log('error');
          if (error.error.errorInfo[0] === '23505') {
              swal.fire(this.messages['error23505']);

         } else {
          console.log('error');

            swal.fire(this.messages['error500']);
          }
        });
      }
  updateDocente(docente: Docente) {
    this.docenteSeleccionado.user.user_name = this.docenteSeleccionado.identificacion;
    this.docenteSeleccionado.user.email = this.docenteSeleccionado.correo_institucional ;
    this.docenteSeleccionado.user.name = this.docenteSeleccionado.apellido1 + ' ' + this.docenteSeleccionado.nombre1;
    this.docenteSeleccionado.user.estado = this.docenteSeleccionado.estado ;
      console.log(docente);
    this.spinner.show();
    this.service.update('usuarios', {'docente': docente, 'usuario': docente.user}).subscribe(
        response => {
//            this.getDocente();
            this.spinner.hide();
          console.log(response);

         //   swal.fire(this.messages['updateSuccess']);
        },
        error => {
          this.spinner.hide();
          console.log('errors');
      });
}
 abrirModalDocente(content, editar: boolean, docente: Docente) {

  if (editar) {
    this.docenteSeleccionado = docente;
  } else {
    this.docenteSeleccionado = new Docente();
  }

  this.modalService.open(content)
    .result
    .then((resultModal => {
      console.log(resultModal);
      if ( resultModal === 'save') {
        if (editar) {
          this.updateDocente(docente);
        } else {
        this.crearDocente();
        console.log('Excelente!!');
      }

      } else {
      }
    }), error => {
      console.log('error');
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
        this.getUsuarioDocentes(1);
        this.total_pages_temp = 10;
        this.crearNumerosPaginacion();
    }

    lastPagina() {
        this.getUsuarioDocentes(this.total_pages);
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
        this.getUsuarioDocentes(this.actual_page);
    }
  filter(event) {
    console.log(event.which);
    if (event.which === 1 || event.which === 13 || this.buscador.length === 0) {
        if (this.buscador.length === 0) {
            this.getUsuarioDocentes(1);
        } else {
            this.getUsuario();
            console.log('error');
        }
    }
}
// crear docente
  // crearDocente(){
  //   this.spinner.show();
  //   this.service.post('docentes',{'docente': this.docente}).subscribe(
  //       response =>{
  //         this.spinner.hide();
  //         // this.getDocente();
  //         console.log(response);
  //         swal.fire(this.messages['createSuccess']);
  //       },
  //       error => {
  //         this.spinner.hide();
  //         console.log('error');

  //         if (error.error.errorInfo[0] === '23505') {
  //             swal.fire(this.messages['error23505']);

  //        } else {
  //         console.log('error');

  //           swal.fire(this.messages['error500']);
  //         }
  //       });
  //     }

}

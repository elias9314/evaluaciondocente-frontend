import { Component, OnInit } from '@angular/core';
import {Docente} from '../modelos/docente.model';
import { User} from '../modelos/user.model';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
///////////////////////////////
import * as jsPDF from 'jspdf';
import { imagenConstant} from '../../../constantes/imagenconstant';
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
  profesoresForm: FormGroup;
  FormBuilder: any;
  p = 1;
  id: any;

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
    this.formularioProfesores();

  }


  getDocente() {
    this.spinner.show();
    this.service.get('docentes').subscribe(
      response => {
        this.docentes = response['profesor'];
        console.log(this.docentes[0]);
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
            console.log(this.docentes[0]);
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
      if (this.profesoresForm.valid) {
    this.docenteSeleccionado.user.user_name = this.docenteSeleccionado.identificacion;
    this.docenteSeleccionado.user.email = this.docenteSeleccionado.correo_institucional ;
    this.docenteSeleccionado.user.name = this.docenteSeleccionado.apellido1 + ' ' + this.docenteSeleccionado.nombre1;
    this.docenteSeleccionado.user.estado = this.docenteSeleccionado.estado ;
    this.docenteSeleccionado.imagen = this.docenteSeleccionado.imagen;
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
    } else {
        alert ('no valido');
    }
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
getDocenteby(id) {
  this.spinner.show();
  this.service.get('docentes/' + id).subscribe(
    response => {
      this.docente = response['docente'][0];
      console.log(this.docente.nombre1);
      this.spinner.hide();
      setTimeout(() => {
        this.generarPDF(this.docente);
       }, 200);
    },
    error => {
      this.spinner.hide();
      console.log('error');

    });
}

PdfFinal(id: any) {

  this.getDocenteby(id);
}

generarPDF(data: any) {
    const lMargin = 20; // left margin in mm

    const rMargin = 20; // right margin in mm

    const pdfInMM = 210;
    const pageCenter = pdfInMM / 2;
  const doc = new jsPDF('p', 'mm', 'a4');
  ////////////////////////////
  doc.addImage(imagenConstant.imagen, 'JPG', 20, 15, 30, 30);
  doc.addImage(imagenConstant.fondo2, 'JPG', 50, 100, 113, 100);
  ////////////////////////////
  doc.setFontStyle('bold');
  doc.setFontSize(15);
  doc.text ('INSTITUTO SUPERIOR TECNOLÓGICO', 61, 25);
  ///////////////////////////
  doc.setFontSize(15);
  doc.setFontStyle('bold');
  doc.text ('DE TURISMO Y PATRIMONIO "YAVIRAC"', 59, 30);
  ///////////////////////////
  doc.setFontSize(9);
  doc.setFontStyle('normal');
  doc.text ('Dirección: García Moreno S435 y Ambato', 79, 35);
  //////////////////////////
  doc.setFontSize(9);
  doc.setFontStyle('normal');
  doc.text ('Quito - Ecuador', 95, 40);
  ///////////////////////////
  doc.setFontStyle('bold');
  doc.setFontSize(15);
  doc.text ('EVALUACIÓN DOCENTE', 79, 60);
  ///////////////////////////
  doc.setFontStyle('bold');
  doc.setFontSize(13);
  doc.text ('NOMBRE:', 20, 70);
 doc.text(data.apellido1 + ' ' + data.nombre1 , 45, 70);
  ////////////////////////////
  doc.setFontStyle('bold');
  doc.setFontSize(13);
  doc.text ('PERIODO ACADÉMICO:', 20, 75);
  ///////////////////////////
  doc.setFontStyle('bold');
  doc.setFontSize(13);
  doc.text ('FECHA:', 20, 80);
  /////////////////////////////
// Margins:
doc.setFontStyle('normal');
doc.setFontSize(11);
const p = 'Con el objetivo de mejorar la calidad de los procesos de enseñanza aprendizaje, el perfeccionamiento docente y el fortalecimiento del proyecto de carrera, se ha motivado a estudiantes, docentes y autoridades a participar en el proceso de evaluación de docentes de forma activa y responsable, estandarizando procedimientos que permita desarrollar de manera organizada el proceso de evaluación el mismo que contempla Auto – Evaluación, Coevaluación y Heteroevaluación.\nUna vez culminado dicho proceso se presentan las siguientes calificaciones:';
const lines = doc.splitTextToSize(p, (pdfInMM - lMargin - rMargin));
doc.text(lMargin, 90, lines, {maxWidth: 160, align: 'justify'});
/////////////////////////////////
doc.setFontStyle('bold');
doc.setFontSize(15);
doc.text ('RESUMEN DE CALIFICACIONES', 70, 130);
////////////////////////////////
doc.setFontStyle('bold');
doc.setFontSize(15);
doc.text ('DOCENCIA', 95, 145);
///////////////////////////////
doc.setFontStyle('bold');
doc.setFontSize(12);
doc.text ('CRITERIO', 57, 155);
////////////////////////////////
doc.setFontStyle('bold');
doc.setFontSize(12);
doc.text ('NOTA', 103, 155);
////////////////////////////////
doc.setFontStyle('bold');
doc.setFontSize(12);
doc.text ('EQUIVALENCIA', 128, 155);

doc.save(data.nombre1 + '.pdf');
 }

 generarpdf2() {
 }
 formularioProfesores() {
     return this.profesoresForm = new FormGroup({
        tipo_identificacion: new FormControl('', [Validators.required]),
         // tslint:disable-next-line:max-line-length
         identificacion: new FormControl ('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
         apellido1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([A-Z])*$')]),
         nombre1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([A-Z])*$')]),
         // tslint:disable-next-line:max-line-length
         correo_institucional: new FormControl('', [Validators.required]),
         estado: new FormControl('', [Validators.required]),
       //  imagen: new FormControl('', [Validators.required])
     });
 }
 get tipo_identificacion() {return this.profesoresForm.get('tipo_identificacion'); }
 get identificacion() {return this.profesoresForm.get('identificacion'); }
 get apellido1() {return this.profesoresForm.get('apellido1'); }
 get nombre1() {return this.profesoresForm.get('nombre1'); }
 get correo_institucional() {return this.profesoresForm.get('correo_institucional'); }
 get estado() {return this.profesoresForm.get('estado'); }

}

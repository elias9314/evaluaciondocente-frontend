import { autoTable } from 'jspdf-autotable';
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
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
  resultado: any = [];
  respuesta: any = [];
  p = 1;
  id: any;
  nota: any = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal, private spinner: NgxSpinnerService, private service: ServiceService,
    private http: HttpClient) {

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
    // this.getResultados();
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
    // this.docenteSeleccionado.imagen = this.docenteSeleccionado.imagen;
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
            // console.log('error');
        }
    }
}
//  getDocenteby(id) {
//      console.log(id);
//    this.spinner.show();
//    localStorage.removeItem('id');
//     localStorage.setItem('id', id.toString());
//    this.service.get('docentes/' + id).subscribe(
//      response => {
//        this.docente = response['docente'][0];
//        console.log(this.docente.nombre1);
//        this.spinner.hide();
//         setTimeout(() => {
//      this.generarPDF(this.docente);
//     }, 200);
//        },
//      error => {
//        this.spinner.hide();
//        console.log('error');

//      });
//  }
notas(idNota) {
    console.log(idNota);
    this.service.get('promedio?periodo_lectivo_id=4' + '&docente_id=' + idNota).subscribe(data => {
      console.log(idNota);
       this.nota = data;
       console.log(data);
       setTimeout(() => {
        this.generarPDF(this.nota);
       }, 200);
    });
  }

PdfFinal(idNota: any) {

//    this.getDocenteby(id);
  this.notas(idNota);
}

generarPDF(data?) {
    console.log(data.promedio);
    if (data.promedio === 0) {
// alert('Este profesor actualmente no esta calificado');

        swal.fire(
          'Este docente',
          'actualmente no esta calificado',
          'error'
        );

    } else {
        const lMargin = 20; // left margin in mm

        const rMargin = 20; // right margin in mm

        const pdfInMM = 210;
        const pageCenter = pdfInMM / 2;
      const doc = new jsPDF('p', 'mm', 'a4');
      const dateOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };
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
      doc.setFontStyle('normal');
      doc.setFontSize(13);
      doc.text(data.docenteAsignatura[0].docente.apellido1 + ' ' + data.docenteAsignatura[0].docente.nombre1 , 45, 70);
      ////////////////////////////
      doc.setFontStyle('bold');
      doc.setFontSize(13);
      doc.text ('PERIODO ACADÉMICO:', 20, 75);
      doc.setFontStyle('normal');
      doc.setFontSize(13);
      doc.text(data.docenteAsignatura[0].periodolectivo.nombre, 75, 75);
      doc.setFontStyle('normal');
      doc.setFontSize(13);
    //   for (let i = 0; i < data.docenteasignatura.length; i++) {
    //     if (data.docenteasignatura[i] === '0' || data.docenteasignatura[i] == null || data.docenteasignatura[i] === '') {
    //       doc.text('No existe', 75, 75);
    //     } else {
    //       doc.text(data.docenteasignatura[i].periodo_lectivo_id.toString(), 75, 75);
    //     }
    //   }

      ///////////////////////////
      doc.setFontStyle('bold');
      doc.setFontSize(13);
      doc.text ('FECHA:', 20, 80);
      doc.setFontStyle('normal');
      doc.setFontSize(13);
    //   doc.text(data.docenteAsignatura[0].updated_at, 40, 80);
      doc.text( new Date().toLocaleString('fr-fr', dateOptions), 45, 80);
      /////////////////////////////
    // Margins:
    doc.setFontStyle('normal');
    doc.setFontSize(11);
    // tslint:disable-next-line:max-line-length
    const p = 'Con el objetivo de mejorar la calidad de los procesos de enseñanza aprendizaje, el perfeccionamiento docente y el fortalecimiento del proyecto de carrera, se ha motivado a estudiantes, docentes y autoridades a participar en el proceso de evaluación de docentes de forma activa y responsable, estandarizando procedimientos que permita desarrollar de manera organizada el proceso de evaluación el mismo que contempla Auto – Evaluación, Coevaluación y Heteroevaluación.\nUna vez culminado dicho proceso se presentan las siguientes calificaciones:';
    const lines = doc.splitTextToSize(p, (pdfInMM - lMargin - rMargin));
    doc.text(lMargin, 90, lines, {maxWidth: 160, align: 'justify'});
    /////////////////////////////////
    doc.setFontStyle('bold');
    doc.setFontSize(15);
    doc.text ('RESUMEN DE CALIFICACIONES', 70, 130);
    ////////////////////////////////
    doc.setDrawColor(30);
    doc.setFillColor(100, 120, 255);
    doc.rect(50, 138, 125, 10, 'F');
    doc.setFontStyle('bold');
    doc.setFontSize(15);
    doc.text ('DOCENCIA', 97, 145);
    ///////////////////////////////
    doc.setDrawColor(30);
    doc.setFillColor(2000, 100, 30);
    doc.rect(50, 148, 125, 10, 'F');
    doc.setFontStyle('bold');
    doc.setFontSize(12);
    doc.text ('CRITERIO', 57, 155);
    // doc.text(data.docenteAsignatura[0].docente_id, 57, 160);
    ////////////////////////////////
    doc.setFontStyle('bold');
    doc.setFontSize(12);
    doc.text ('NOTA', 103, 155);
    doc.rect(50, 158, 46, 10);
    doc.rect(96, 158, 26, 10);
    doc.rect(50, 158, 125, 10);


        doc.setFontSize(9);
        doc.text('EVALUACIÓN-ESTUDIANTIL', 52, 165);
        doc.setFontSize(11);
        doc.text(data.promedio.toString() + '/100', 105, 165);
        // doc.text(data.docenteasignatura[i].nota_total, 105, 165);
    //   }
    // }

    ////////////////////////////////
    doc.setFontStyle('bold');
    doc.setFontSize(12);
    doc.text ('EQUIVALENCIA', 130, 155);
    doc.text(data.total30.toString() + '/30', 142, 165);

    // for (let i = 0; i < data.docenteAsignatura.length; i++) {
    //     console.log(data.docenteAsignatura[i].porcentaje);
    //     if (data.docenteAsignatura[i].porcentaje.length > 1) {
    //         doc.text (data.docenteAsignatura[i].porcentaje, 142, 165);
    //     } else {
    //         doc.text(data.docenteAsignatura[i].porcentaje, 145, 165);
    //     }


    doc.setFontStyle('bold');
    doc.setFontSize(11);
    doc.text ('OBSERVACIONES Y RECOMENDACIONES', lMargin, 175);

    doc.setFontStyle('bold');
    doc.setFontSize(11);
    doc.text ('FIRMA DEL DOCENTE', 85, 205);
    doc.setFontStyle('normal');
    doc.setFontSize(11);
    doc.line(130, 221, 85, 221);
    doc.text ('Msc. Iván Borja\nRector IST YAVIRAC', 85, 227);
    doc.setFontStyle('bold');
    doc.setFontSize(10);
    doc.text ('Realizado por:', 55, 238);
    doc.setFontStyle('normal');
    doc.setFontSize(10);
    doc.line(130, 243, 87, 243);
    doc.text ('Mg. Diego Yánez', 55, 243);
    doc.setFontStyle('normal');
    doc.setFontSize(10);
    doc.line(130, 253, 93, 253);
    doc.text ('Ing. Pablo Maldonado', 55, 253);
    doc.setFontStyle('normal');
    doc.setFontSize(10);
    doc.line(130, 263, 90, 263);
    doc.text ('Ing. Cristhian Viteri', 55, 263);
    doc.save(data.docenteAsignatura[0].docente.nombre1 + '.pdf');
    }

 }

//  generarpdf2() {
//      const id = document.getElementById('pdf');
//     const doc = new jsPDF({
//         orientacion: 'l',
//         unit: 'pt',
//         format: 'carta',
//         possition: 2
//     });
//     doc.setFontSize(22);
//     doc.setFontStyle('cursiva');
//     doc.text('Reportes', 180, 20);
//     doc.fromHTML(id, 200, 500);
// doc.save('todo los reportes.pdf');
//  }
//  pdf2Final() {
//    this.getResultados();
//  }
//  getResultados() {
//     this.http.get<any>(environment.API_URL + 'respuestas').subscribe(data => {
//         this.respuesta = data;
//         console.log(data);
//     //     setTimeout(() => {
//     //         this.generarpdf2(this.respuesta);
//     //        }, 200);
//     });
// }



 formularioProfesores() {
     return this.profesoresForm = new FormGroup({
        tipo_identificacion: new FormControl('', [Validators.required]),
         // tslint:disable-next-line:max-line-length
         identificacion: new FormControl ('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
         apellido1: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^([A-Za-z])*$')]),
         nombre1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^([A-Za-z])*$')]),
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

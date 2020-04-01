import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';
import {Docente} from '../../modelos/docente.model';
import {catalogos} from '../../../../../environments/catalogos';
import {NgxSpinnerService} from 'ngx-spinner';
import {Instituto} from '../../modelos/instituto.model';
import {Carrera} from '../../modelos/carrera.model';
import {User} from '../../modelos/user.model';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-datos-docente',
  templateUrl: './datos-docente.component.html',
  styleUrls: ['./datos-docente.component.scss']
})
export class DatosDocenteComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private http: HttpClient) { }
  user: User;
  docente: Docente;
  docentesData: any = [];
  estadoDatos: string;
  errors: Array<string>;
data: any;
    docentes: Array<Docente>;
    title: 'sweetalert';

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.docente = new Docente();
        this.estadoDatos = '';

    this.getDocenteLoad();
  }

  updateDocente(): void {
    if (this.docente[0].telefono ) {
         this.docente[0].telefono;
    }
    this.service.update('docentes',
        {'docente': this.docente[0]})
        .subscribe(
            response => {
                this.getDocente();
            },
            error => {
                this.getDocente();
            });

}
getDocenteLoad() {
  this.spinner.show();

  this.service.get('docentes/' + this.user.id).subscribe(
      response => {
          for (const key in response) {
            const x = response[key];
            this.docentesData = x;
            console.log('X:_', x);
          }

          this.docente = response['docente'];
          console.log('DocenteData_:', this.docente);
          this.spinner.hide();
      },
      error => {
          this.spinner.hide();
          // if (error.status === 401) {
          //   swal({
          //     position: this.messages['createError401']['position'],
          //     type: this.messages['createError401']['type'],
          //     title: this.messages['createError401']['title'],
          //     text: this.messages['createError401']['text'],
          //     showConfirmButton: this.messages['createError401']['showConfirmButton'],
          //     backdrop: this.messages['createError401']['backdrop']
          //   });
          // }
      });
}

getDocente() {
    this.estadoDatos = 'Guardando...';
    this.service.get('docentes/' + this.user.id).subscribe(
        response => {
            this.docente = response['docente'];
            console.log(response);
            Swal.fire(
                'Actualizado',
                'con exito!',
                'success'
              );
            // alert('Actualizado con exito');
        },
        error => {
            console.log ('error');
            // this.spinner.hide();
            // if (error.status === 401) {
            //   swal({
            //     position: this.messages['createError401']['position'],
            //     type: this.messages['createError401']['type'],
            //     title: this.messages['createError401']['title'],
            //     text: this.messages['createError401']['text'],
            //     showConfirmButton: this.messages['createError401']['showConfirmButton'],
            //     backdrop: this.messages['createError401']['backdrop']
            //   });
            // }
        });
  }

// editar = (id) => {
//     console.log(id);
//     this.data = {
//         'docente': [{
//             'id': 'id',
//             'identificacion': 'identificacion',
//             'apellido1': 'apellido1',
//             'apellido2': 'apellido2',
//             'nombre1': 'nombre1',
//             'nombre2': 'nombre2',
//             'correo_institucional': 'correo_institucional',
//             'correo_personal': 'correo_personal',
//             'fecha_nacimiento': 'fecha_nacimiento',
//             'telefono': 'telefono',
//             'sexo': 'sexo',
//             'estado': 'estado',
//             'tipo_identificacion': 'tipo_identificacion'
//         }]
//     };
//         this.http.put(environment.API_URL + 'docentes', this.data).subscribe(data => {
//             console.log (data);
//             alert ('datos actualizados correctamente');
//         });
//     }

}

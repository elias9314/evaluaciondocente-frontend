// import { Carrera_users } from './../modelos/carrera_user.model';
import { environment } from '../../../../environments/environment';
import { Estudiante } from './../../notas/modelos/estudiante.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-admin-estudiante',
  templateUrl: './admin-estudiante.component.html',
  styleUrls: ['./admin-estudiante.component.scss']
})
export class AdminEstudianteComponent implements OnInit {

    parametrosEstudiante: any[];
    data: any;
    respuesta: any[];
    filterPost = '';
    pageActual = 1;
    respuestaCarrera: any[];
    buscador: string;
    // carreraUses: Carrera_users;
  constructor(private http: HttpClient, private service: ServiceService ) { }

  ngOnInit() {
      this.parametrosEstudiante = [
          {
              id: 'id',
              cedula: 'Cedula',
              nombre: 'Nombre',
              apellido: 'Apellido',
              correo: 'Correo',
              carrera: 'Carrera',
              estado: 'Estado',
              estadoEvaluacion: 'Estado de Evaluación'
          }
      ];
      this.traerEstudiantes();
      this.BusquedaCarrera();
  }

  traerEstudiantes() {
      this.http.get<any>(environment.API_URL + 'admin-estudiantes').subscribe(data => {
          this.respuesta = data['admin-estudiante'];
          console.log(data);
      });
  }
  BusquedaCarrera() {
      this.http.get<any>(environment.API_URL + 'carreras').subscribe(data => {
        this.respuestaCarrera = data['carreras'];
        console.log(data);
      });
  }
//   filter(event) {
//     console.log(event.which);
//     if (event.which === 1 || event.which === 13 || this.buscador.length === 0) {
//         if (this.buscador.length === 0) {
//             this.BusquedaCarrera();
//         } else {
//             this.traerEstudiantes();
//             console.log('error');
//         }
//     }
// }
}

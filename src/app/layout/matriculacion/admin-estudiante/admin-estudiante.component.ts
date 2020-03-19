import { environment } from '../../../../environments/environment';
import { Estudiante } from './../../notas/modelos/estudiante.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.parametrosEstudiante = [
          {
              id: 'Id',
              cedula: 'Cedula',
              nombre: 'Nombre',
              apellido: 'Apellido',
              correo: 'Correo Institucional',
              estado: 'Estado',
              estadoEvaluacion: 'Estado de Evaluación'
          }
      ];
      this.respuesta = [{
          id: 1,
          cedula: '1750283721',
          nombre: 'Joel',
          apellido: 'Castro',
          correo: 'jme.castro@yavirac.edu.ec',
          carrera: 'Desarrollo de Software',
          estado: 'ACTIVO',
          estadoEvaluacion: 'EVALUADO'
      },
      {
        id: 2,
        cedula: '1234567899',
        nombre: 'Angie',
        apellido: 'Ortega',
        correo: 'ajo.ortega@yavirac.edu.ec',
        carrera: 'Desarrollo de Software',
        estado: 'ACTIVO',
        estadoEvaluacion: 'No EVALUADO'
    },
    {
        id: 3,
        cedula: '234567890',
        nombre: 'Roger',
        apellido: 'Lovezno',
        correo: 'rfs.lovesno@yavirac.edu.ec',
        carrera: 'Desarrollo de Software',
        estado: 'ACTIVO',
        estadoEvaluacion: 'EVALUADO'
    },
    {
        id: 4,
        cedula: '3456789012',
        nombre: 'Maria',
        apellido: 'Reyes',
        correo: 'mmt.reyes@yavirac.edu.ec',
        carrera: 'Diseño de Modas',
        estado: 'ACTIVO',
        estadoEvaluacion: 'NO EVALUADO'
    },
    {
        id: 5,
        cedula: '5678901234',
        nombre: 'Johan',
        apellido: 'Espinosa',
        correo: 'jvc.espinosa@yavirac.edu.ec',
        carrera: 'Marqueting',
        estado: 'ACTIVO',
        estadoEvaluacion: 'EVALUADO'
    }];
  }

//   traerEstudiantes() {
//       this.http.get<any>(environment.API_URL + '').subscribe(data => {
//           this.respuesta = data;
//           console.log(data);
//       });
//   }

}

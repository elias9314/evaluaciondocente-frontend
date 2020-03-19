import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'adm-docentes',
  templateUrl: './adm-docentes.component.html',
  styleUrls: ['./adm-docentes.component.scss']
})
export class AdmDocentesComponent implements OnInit {

    elements: any = [
        {id: 1,cedula:'1324141', nombre: 'Mark', apellido: 'Otto', correo: 'mark@yavirac.edu.ec',telefono:'0939451323',estado:'ACTIVO'},
        {id: 2,cedula:'1234231', nombre: 'Roger', apellido: 'Pozo', correo: 'roger@yavirac.edu.ec',telefono:'0979538999',estado:'ACTIVO'},
        {id: 3,cedula:'1324141', nombre: 'Anahi', apellido: 'Andrade', correo: 'kimi@yavirac.edu.ec',telefono:'0989104178',estado:'ACTIVO'},

      ];
    
      headElements = ['Id','Cédula', 'Nombre', 'Apellido', 'Correo Institucional','Teléfono','Estado'];
    
      ngOnInit() {

      }

}

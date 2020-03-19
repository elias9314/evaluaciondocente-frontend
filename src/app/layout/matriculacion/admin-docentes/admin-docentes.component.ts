import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-docentes',
  templateUrl: './admin-docentes.component.html',
  styleUrls: ['./admin-docentes.component.scss']
})
export class AdminDocentesComponent implements OnInit {

  
  
  elements: any = [
    {id: 1,cedula:'1324141', nombre: 'Mark', apellido: 'Otto', correo: 'mark@yavirac.edu.ec',telefono:'0939451323',estado:'ACTIVO'},
    {id: 2,cedula:'1234231', nombre: 'Roger', apellido: 'Pozo', correo: 'roger@yavirac.edu.ec',telefono:'0979538999',estado:'ACTIVO'},
    {id: 3,cedula:'1324141', nombre: 'Anahi', apellido: 'Andrade', correo: 'kimi@yavirac.edu.ec',telefono:'0989104178',estado:'ACTIVO'},

  ];

  headElements = ['Id','Cédula', 'Nombre', 'Apellido', 'Correo Institucional','Teléfono','Estado'];

  ngOnInit() {

  }


}

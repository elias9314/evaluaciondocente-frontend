import {User} from './user.model';
import { DocenteAsignatura } from './docente-asignatura.model';
export class Docente {
    id?: number;
    tipo_identificacion: string;
    identificacion: string;
    apellido1: string;
    apellido2: string;
    nombre1: string;
    nombre2: string;
    sexo: string;
    correo_personal: string;
    correo_institucional: string;
    fecha_nacimiento: Date;
    estado: string;
    telefono: number;
    user: User;
    imagen: File;
    docenteasignatura: DocenteAsignatura;

  constructor() {
    this.tipo_identificacion = '1';
    this.user = new User();
    this.docenteasignatura = new DocenteAsignatura();
  }

  }

import {Component, OnInit} from '@angular/core';
import {Matricula} from '../modelos/matricula.model';
import {ServiceService} from '../service.service';
import swal from 'sweetalert2';
import kjua from 'kjua';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {catalogos} from '../../../../environments/catalogos';
import {InformacionEstudiante} from '../modelos/informacion-estudiante.model';
import {Estudiante} from '../modelos/estudiante.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../modelos/user.model';
import {Asignatura} from '../modelos/asignatura.model';
import {AsignaturaMatricula} from '../modelos/asignatura-matricula.model';
import { mergeMap, groupBy, reduce, map, toArray } from 'rxjs/operators';
import { of } from 'rxjs';
﻿import { from } from 'rxjs';

@Component({
    selector: 'app-eva-estudiante-docente',
    templateUrl: './eva-estudiante-docente.component.html',
    styleUrls: ['./eva-estudiante-docente.component.scss']
})
export class EvaEstudianteDocenteComponent implements OnInit {
    evaPreguntas: Array<any>;
    evaRespuestas: Array<any>;
    docenteAsignatura: any;
    flagInformacionEstudiante: boolean;
    asignaturasMatricula: Array<AsignaturaMatricula>;
    flagSeccion1: boolean;
    flagSeccion2: boolean;
    flagSeccion3: boolean;
    errors: string;
    doc: any;
    messages: any;
    estudiante: Estudiante;
    informacionEstudiante: InformacionEstudiante;
    matricula: Matricula;
    user: User;
    tab: any;
    mostrarPregunta: Array<any>;
    cantidadRespuestas: Array<number>;
    datademo: any = [];
    listarespuesta: any = [];
    enviarrespuesta: any = [];

    constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.asignaturasMatricula = new Array<AsignaturaMatricula>();
        this.flagInformacionEstudiante = false;
        this.messages = catalogos.messages;
        this.getEstudiante();
        this.mostrarPreguntas();
    }

    getEstudiante() {
        this.spinner.show();
        this.service.get('estudiantes/asignaturas_actual?user_id=' + this.user.id + '&periodo_lectivo_id=4').subscribe(
            response => {
                console.log(response);
                this.asignaturasMatricula = response['asignaturas_matricula'];
                this.spinner.hide();
                this.flagInformacionEstudiante = true;
            },
            error => {
                this.flagInformacionEstudiante = false;
                this.spinner.hide();
                if (error.error.errorInfo[0] === '001') {
                    swal.fire(this.messages['error001']);
                } else {
                    swal.fire(this.messages['error500']);
                }
            });
    }

    evaluate() {
        this.spinner.show();
        let parameters = '?periodo_lectivo_id=4&asignatura_id=512&paralelo=1&jornada=1';
        this.service.get('estudiantes/docente_asignatura' + parameters).subscribe(
            response => {
                this.docenteAsignatura = response['docente_asignatura'][0];
                this.spinner.hide();
                this.flagInformacionEstudiante = false;
                parameters = '?docente_asignatura_id=512' + '&user_id=551' ;
                this.service.get('estudiantes/eva_preguntas' + parameters).subscribe(
                    response2 => {
                        this.evaPreguntas = new Array<any>();
                        this.evaPreguntas = response2['eva_preguntas'];
                        this.spinner.hide();
                        this.flagInformacionEstudiante = false;
                    },
                    error => {
                        this.flagInformacionEstudiante = true;
                        this.spinner.hide();
                        if (error.error.errorInfo[0] === '001') {
                            swal.fire(this.messages['error001']);

                        } else {
                            swal.fire(this.messages['error500']);
                        }
                    });
            },
            error => {
                this.flagInformacionEstudiante = true;
                this.spinner.hide();
                if (error.error.errorInfo[0] === '001') {
                    swal.fire(this.messages['error001']);
                } else {
                    swal.fire(this.messages['error500']);
                }
            });
    }

    updateRespuesta(event, pregunta) {
        this.spinner.show();
        this.service.post('estudiantes/eva_respuestas?eva_respuesta_id=' + event.target.id
            + '&valor=' + pregunta.valor, null).subscribe(
            response => {
                this.spinner.hide();
                this.mostrarPregunta = new Array<any>();
            },
            error => {

                this.spinner.hide();
                if (error.error.errorInfo[0] === '001') {
                    swal.fire(this.messages['error001']);
                } else {
                    swal.fire(this.messages['error500']);
                }
            });
    }

    onSelectionChange(entry: any) {
this.enviarrespuesta.push(entry);
console.log(this.enviarrespuesta);

    }

    addListPreOpc(preguntaId: number, respuesta: any) {
        const datas = this.enviarrespuesta.find(x => x.pregId === preguntaId);
        // Comprueba si el valor existe en el array
        if (datas !== undefined) {
          // De ser asi tomo su posicion y lo elimina
          const dt = this.enviarrespuesta.indexOf(datas);
          this.enviarrespuesta.splice(dt, 1);
          this.enviarrespuesta.push({
            pregId: preguntaId,
            respId: respuesta.id,
            FechaIni: Date.now()
          });
        } else {
          // Caso contrario lo agrega al array
          this.enviarrespuesta.push({
            pregId: preguntaId,
            respId: respuesta.id,
            FechaIni: Date.now()
          });
        }
console.log(this.enviarrespuesta);
      }

    mostrarPreguntas() {
        this.spinner.show();
        const parameters = '?tipo_evaluacion=1';
        this.service.get('eva_preguntas_eva_respuestas' + parameters).subscribe(
            response => {
                this.mostrarPregunta = response['eva_pregunta_eva_respuesta'];
                console.log('Preguntas', response);
                const source = from(this.mostrarPregunta);
                // group by age
                const example = source.pipe(
                    groupBy(person => person.pregunta),
                    // return each item in group as array
                    mergeMap(group => group.pipe(toArray()))
                  );
                  const subscribes = example.subscribe(val =>
                    this.datademo.push(val)
                    );
                console.log(this.datademo);
             const resp = source.pipe(
                 groupBy(respuesta => respuesta.id),
                 mergeMap(group => group.pipe(toArray()))
             );
             const subscribe = resp.subscribe(val =>
                this.listarespuesta.push(val));
                console.log(this.listarespuesta[0]);
                    },
                    error => {
                        this.spinner.hide();
                        console.log('error');

                    });





    }
}

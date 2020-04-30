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
import {DocenteAsignatura} from '../modelos/docente-asignatura.model';
import {Resultado} from '../modelos/resultado.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


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
    resultados: any;
    mostrarPregunta: Array<any>;
    cantidadRespuestas: Array<number>;
    datademo: any = [];
    listarespuesta: any = [];
    enviarrespuesta: any = [];
    resultadoPromedio: any = [];
    usersID: any = [];
    idAsigantura: any = [];
    idDocenteAsignatura: any = [];
    respuesta: any = [];
    resultado: any = [];
    resultadoDocenteAsignatura: any [];
    docenteAsig: DocenteAsignatura;
    docenteAsignaturas: Array<DocenteAsignatura>;
    resultadoSeleccionado: Resultado;
    evaluar: boolean;
    evaluado: boolean;
    formulario: FormGroup;
    validacion: any;

    constructor(private spinner: NgxSpinnerService, private service: ServiceService, private form: FormBuilder) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.docenteAsig = JSON.parse(localStorage.getItem('docenteAsignatura')) as DocenteAsignatura;
        this.docenteAsignaturas = new Array<DocenteAsignatura>();
        this.asignaturasMatricula = new Array<AsignaturaMatricula>();
        this.flagInformacionEstudiante = false;
        this.messages = catalogos.messages;
        this.getEstudiante();
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



    // evaluate(idAsignatura?, idUsuario?) {
    //     this.spinner.show();
    //     let parameters = '?periodo_lectivo_id=4&asignatura_id=512&paralelo=1&jornada=1';
    //     this.service.get('estudiantes/docente_asignatura' + parameters).subscribe(
    //         response => {
    //             this.spinner.hide();
    //             this.flagInformacionEstudiante = false;
    //             parameters = '?docente_asignatura_id=512' + '&user_id=551' ;
    //             this.service.get('estudiantes/eva_preguntas' + parameters).subscribe(
    //                 response2 => {
    //                     this.spinner.show();
    //                     this.getOne(idAsignatura);
    //                     this.getid(idUsuario);
    //                     this.evaluado = true;
    //                     this.evaPreguntas = new Array<any>();
    //                     this.evaPreguntas = response2['eva_preguntas'];
    //                     this.spinner.hide();
    //                     this.flagInformacionEstudiante = false;
    //                 },
    //                 error => {
    //                     this.flagInformacionEstudiante = true;
    //                     this.spinner.hide();
    //                     if (error.error.errorInfo[0] === '001') {
    //                         swal.fire(this.messages['error001']);

    //                     } else {
    //                         swal.fire(this.messages['error500']);
    //                     }
    //                 });
    //         },
    //         error => {
    //             this.flagInformacionEstudiante = true;
    //             this.spinner.hide();
    //             if (error.error.errorInfo[0] === '001') {
    //                 swal.fire(this.messages['error001']);
    //             } else {
    //                 swal.fire(this.messages['error500']);
    //             }
    //         });
    // }

    onSelectionChange(entry: any) {
        this.enviarrespuesta.push(entry);
        console.log(this.enviarrespuesta);
    }

    addListPreOpc1(preguntaId: number, respuesta: any) {
        this.spinner.show();
        const estudiante = this.asignaturasMatricula[0].estudiante_id;
        const docente = this.docenteAsignaturas[0].id;
        this.spinner.hide();
        const datas = this.enviarrespuesta.find(x => x.pregId === preguntaId);
        // Comprueba si el valor existe en el array
        if (datas !== undefined) {
          // De ser asi tomo su posicion y lo elimina
          const dt = this.enviarrespuesta.indexOf(datas);
          this.enviarrespuesta.splice(dt, 1);
          this.enviarrespuesta.push({
            pregId: preguntaId,
            respId: respuesta.id,
            tipo: 'CUANTITATIVA',
            estado: 'ACTIVO',
            valor: respuesta.valor,
            estudiante_id: estudiante,
            eva_pregunta_eva_respuesta_id: respuesta.eva_pregunta_eva_respuesta_id,
            idDocenteAsignatura: docente
            // FechaIni: Date.now()

          });
        } else {
          // Caso contrario lo agrega al array
          this.enviarrespuesta.push({
            pregId: preguntaId,
            respId: respuesta.id,
            tipo: 'CUANTITATIVA',
            estado: 'ACTIVO',
            valor: respuesta.valor,
            estudiante_id: estudiante,
            eva_pregunta_eva_respuesta_id: respuesta.eva_pregunta_eva_respuesta_id,
            idDocenteAsignatura: docente
            // FechaIni: Date.now()
          });
        }
    console.log('es esto', this.enviarrespuesta);
      }

    mostrarPreguntas(idAsignatura?, idUsuario?) {
        this.spinner.show();
        const parameters = '?tipo_evaluacion=1';
        this.service.get('eva_preguntas_eva_respuestas' + parameters).subscribe(
            response => {
                this.flagInformacionEstudiante = false;
                this.getOne(idAsignatura);
                this.getid(idUsuario);
                this.mostrarPregunta = response['eva_pregunta_eva_respuesta'];
                this.flagInformacionEstudiante = false;
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
                console.log(this.listarespuesta[0].length);
            },
            error => {
                this.flagInformacionEstudiante = true;
                this.spinner.hide();
                console.log('error');

            });

    }

    getid(id: number) {
        localStorage.removeItem('id');
        localStorage.setItem('id', id.toString());
        this.service.get('docentes/' + id).subscribe(
            response => {
                this.respuesta = response['docente'];
                console.log('docente', this.respuesta[0].id);
            // this.getIdDocenteAsignatura();

            });

    }
    getOne(id: number) {
        localStorage.removeItem('id');
        localStorage.setItem('id', id.toString());
        this.service.get('asignaturaEstudiante/' + id).subscribe(response => {
            console.log(response);
            this.resultado = response['asignatura'];
            console.log(this.resultado.id);
            this.getIdDocenteAsignatura();
        });
    }

    getIdDocenteAsignatura() {
        this.spinner.show();
        const asignatura = this.resultado.id;
        const parameters = '?asignatura_id=' + asignatura;
        this.service.get('asignatura_docente' + parameters).subscribe(
            response => {
                this.docenteAsignaturas = response['docenteAsignatura'];
                this.spinner.hide();
                console.log('PERIODO LECTIVO',this.docenteAsignaturas[0].periodo_lectivo_id );
            },
                error => {
                    this.spinner.hide();
                    console.log('error');
                }
    );
    }
    addListPreOpc(preguntaId: number, respuesta: any) {
                            const datas = this.enviarrespuesta.find(x => x.idpregunta === preguntaId + 1);
                            // Comprueba si el valor existe en el array
                            if (datas !== undefined) {
                                // De ser asi tomo su posicion y lo elimina
                                this.enviarrespuesta.splice(this.enviarrespuesta.indexOf(datas), 1);
                                this.enviarrespuesta.push(respuesta);
                            } else {
                                // Caso contrario lo agrega al array
                                this.enviarrespuesta.push(respuesta);
                            }
                            console.log(this.enviarrespuesta);
            }

    calificar() {
        if (this.enviarrespuesta.length === this.listarespuesta[0].length) {
            this.spinner.show();
            const docente_asignatura_id = this.docenteAsignaturas[0].id;
            const periodo_lectivo_id= this.docenteAsignaturas[0].periodo_lectivo_id;
            const docenteID= this.respuesta[0].id;
            console.log('esto',docenteID);
            let parameters = '?idDocenteAsignatura=' + docente_asignatura_id;
            this.service.post('resultado' + parameters, {'eva_resultados': this.enviarrespuesta}).subscribe(
                response => {
                    this.evaluado = true ;
                    console.log('RESULTADO', response);
                    this.getEstudiante();
                    this.spinner.hide();
                    swal.fire(this.messages['createSuccess']);
                    parameters= '?docente_asignatura_id='+docente_asignatura_id;
                    this.service.get('docenteId' +parameters).subscribe(
                        response2 =>{
                            console.log('PromedioFinal', response2);
                            this.spinner.hide();
                            parameters= '?periodo_lectivo_id='+ periodo_lectivo_id+'&docente_id='+ docenteID;
                            this.service.get('promedio'+parameters).subscribe(
                                response3 => {
                                    console.log('PromedioAsignaturas', response3);
                                    this.spinner.hide();
                                    parameters= '?periodo_lectivo_id='+ periodo_lectivo_id+'&id='+ docente_asignatura_id;
                                    this.service.get('evaluado'+parameters).subscribe(
                                        response4 => {
                                            this.getEstudiante();
                                            console.log('Estado_Evaluado', response4[0]['estado_evaluacion']);
                                            this.spinner.hide();
                                            
                                        },
                                        error=>{
                                            this.spinner.hide();
                                            console.log('error');
                                        }
                                    )
                                    
                                },
                                error=>{
                                    this.spinner.hide();
                                    console.log('error');
                                }
                            )

                        },
                        error=>{
                            this.spinner.hide();
                            console.log('error');
                        }
                    )},
                error => {
                    this.flagInformacionEstudiante = true;
                    this.spinner.hide();
                    if (error.error.errorInfo[0] === '001') {
                            swal.fire(this.messages['error001']);

                    } else {
                        swal.fire(this.messages['error500']);
                    }
            });
            console.log('guardado');
        }else {
            // console.log('vales vrga tienes que llenar todos los campos ');
            swal.fire(
                'error',
                'Debe responder todas las preguntas',
                'error'
               //  'Something went wrong!'
           );
        }
    }
    evaluate(){
        const docente_asignatura_id = this.docenteAsignaturas[0].id;
        const periodo_lectivo_id= this.docenteAsignaturas[0].periodo_lectivo_id;
        let parameters= '?periodo_lectivo_id='+ periodo_lectivo_id+'&id='+ docente_asignatura_id;
                                    this.service.get('evaluado'+parameters).subscribe(
                                        response4 => {
                                            console.log('Evaluado', response4);
                                            console.log('Estado_Evaluado', response4[0]['estado_evaluacion']);
                                            this.spinner.hide();
                                            
                                        },
                                        error=>{
                                            this.spinner.hide();
                                            console.log('error');
                                        }
                                    );
                            
    }
}

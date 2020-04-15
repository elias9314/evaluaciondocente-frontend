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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThemeService } from 'ng2-charts';
import {DocenteAsignatura} from '../modelos/docente-asignatura.model';
import { Docente } from '../modelos/docente.model';
import {Resultado} from '../modelos/resultado.model';
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
    docenteAsignaturas: Array<DocenteAsignatura>;
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
    docenteAsig:DocenteAsignatura;
    docente:Docente;
    mostrarPregunta: Array<any>;
    cantidadRespuestas: Array<number>;
    datademo: any = [];
    listarespuesta: any = [];
    enviarrespuesta: any = [];
    usersID: any = [];
    respuesta: any [];
    resultadoSeleccionado: Resultado;
    idAsigantura: any = [];
    idDocenteAsignatura: any = [];
    resultado: any[];
    resultadoDocenteAsignatura:any[];

    ejemplo:any[];
    constructor(private spinner: NgxSpinnerService, private service: ServiceService, private http: HttpClient) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.docenteAsig= JSON.parse(localStorage.getItem('docenteAsignatura')) as DocenteAsignatura;
        this.asignaturasMatricula = new Array<AsignaturaMatricula>();
        //this.docenteAsignaturas= new Array<DocenteAsignatura>();
        this.flagInformacionEstudiante = false;
        this.messages = catalogos.messages;
        this.getEstudiante();
        this.mostrarPreguntas();
        //this.traerDocenteAsignatura();

    }

    getEstudiante() {
        this.spinner.show();
        this.service.get('estudiantes/asignaturas_actual?user_id=' + this.user.id + '&periodo_lectivo_id=4').subscribe(
            response => {
                this.asignaturasMatricula = response['asignaturas_matricula'];
                this.spinner.hide();
                console.log(this.asignaturasMatricula);
                this.asignaturasMatricula.forEach(result => {
                    this.http.get<any>(environment.API_URL + 'docentes/' + result.user_id ).subscribe(res => {
                       result.docente = res['docente'][0];
                    });
                });
                console.log(this.asignaturasMatricula);

                // this.asignaturasMatricula.forEach(result => {
                //     console.log(result);
                //     console.log(this.asignaturasMatricula);
                //     this.usersID.push(result.user_id);
                //     console.log(result.codigo);
                // });
                this.flagInformacionEstudiante = true;
            },
            error => {
                console.log(error);
                this.flagInformacionEstudiante = false;
                this.spinner.hide();
                swal.fire(this.messages['error500']);

            });
    }

    evaluate(idAsignatura?, idUsuario?) {
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
                        this.getOne(idAsignatura);
                        this.getid(idUsuario);
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
            //preNombre: pregunta.nombre,
            // respId: respuesta.id,
            // respNombre: respuesta.nombre,
            //respValor: respuesta.valor,
            // FechaIni: Date.now()
            valor:respuesta.valor,
            tipo:'CUANTITATIVA',
            estado:'ACTIVO',
            eva_pregunta_eva_respuesta:null,
            estudiante:this.user.id,
            docente_asignatura: null
          });
        //   this.ejemplo.splice(dt, 1);
        //   this.ejemplo.push({
        //       valor:respuesta.valor,
        //       tipo:'CUANTITATIVA',
        //       estado:'ACTIVO',
        //       eva_pregunta_eva_respuesta:null,
        //       estudiante:this.user.id,
        //       docente_asignatura: null
        //   })
        } else {
          // Caso contrario lo agrega al array
          this.enviarrespuesta.push({
            // pregId: preguntaId,
            // //preNombre: pregunta.nombre,
            // respId: respuesta.id,
            // respNombre: respuesta.nombre,
            // respValor: respuesta.valor,
            // FechaIni: Date.now()
            valor:respuesta.valor,
            tipo:'CUANTITATIVA',
            estado:'ACTIVO',
            eva_pregunta_eva_respuesta:null,
            estudiante:this.user.id,
            docente_asignatura: null
            // this.service.post('resultado', {'valor': this.resultadoSeleccionado}).subscribe(
            //     response => {
            //         this.resultadoSeleccionado === respuesta.id;
            //         console.log(response);
            //     },
            //     error=> {
            //         this.spinner.hide();
            //         console.log('error');
            //     }
            // )
        });
        // this.ejemplo.push({
        //     valor:respuesta.valor,
        //     tipo:'CUANTITATIVA',
        //     estado:'ACTIVO',
        //     eva_pregunta_eva_respuesta:null,
        //     estudiante:this.user.id,
        //     docente_asignatura: null
        // })

    }
console.log('es esto',this.enviarrespuesta);
console.log('La magia',this.ejemplo);

    }


    mostrarPreguntas() {
        this.spinner.show();
        const parameters = '?tipo_evaluacion=1';
        this.service.get('eva_preguntas_eva_respuestas' + parameters).subscribe(
            response => {
                this.mostrarPregunta = response['eva_pregunta_eva_respuesta'];
                console.log('Preguntas', response);
                // this.flagInformacionEstudiante = false;

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
                console.log('datademo',this.datademo);
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
    getid(codigo: number) {
        console.log(codigo);
        localStorage.removeItem('codigo');
        localStorage.setItem('codigo', codigo.toString());
        console.log(this.usersID);
        console.log(codigo);
        // if (codigo === this.usersID) {
            // this.service.get('docentes/' + codigo ).subscribe(
            //     response => {
            //         console.log(response);
            //         this.respuesta = response['docentes'];
            //     });

            this.http.get<any>(environment.API_URL + 'docentes/' + codigo ).subscribe(response => {
                console.log(response);
                this.respuesta = response['docente'];
                console.log(this.respuesta);
            });
        // }
    }
    getOne(id: number) {
        console.log(id);
        localStorage.removeItem('id');
        localStorage.setItem('id', id.toString());
        console.log(this.idAsigantura);
        console.log(id);
        this.http.get<any>(environment.API_URL + 'asignaturaEstudiante/' + id ).subscribe(response => {
            console.log(response);
            this.resultado = response['asignatura'];
            console.log(this.resultado);
        });
    }
    // getIdDocenteAsignatura(id:number){
    //     console.log(id);
    //     localStorage.removeItem('id');
    //     localStorage.setItem('id', id.toString());
    //     console.log(this.idDocenteAsignatura);
    //     console.log(id);
    //     this.http.get<any>(environment.API_URL+'asignatura_docente/' +id).subscribe(response => {
    //         console.log(response);
    //         this.resultadoDocenteAsignatura = response['docente_asignatura'];
    //         console.log(this.resultadoDocenteAsignatura);
    //     });

    // }
    guardarResultados(){
        if(this.respuesta !== this.respuesta){
            this.spinner.show();

            this.service.post('resultado', {'eva_resultados': this.resultadoSeleccionado}).subscribe(
                response => {
                    this.mostrarPreguntas();
                    console.log(response);
                },
                error=> {
                    this.spinner.hide();
                    console.log('error');
                }
            );
        } else{
            swal.fire(
                'error'
            );
        }
    }
}
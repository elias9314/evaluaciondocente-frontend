import { Respuestas } from './../modelos/respuestas.model';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { EvaPregunta } from '../../notas/modelos/eva-pregunta.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pregunta-respuesta',
  templateUrl: './pregunta-respuesta.component.html',
  styleUrls: ['./pregunta-respuesta.component.scss']
})
export class PreguntaRespuestaComponent implements OnInit {
    preguntas: Array<Respuestas>;
    preguntaSeleccionada: Respuestas;
    pregunta: Respuestas;
    respuestas: any;
    resultados: any;
    tablas: any;
  constructor(private spinner: NgxSpinnerService,
    private service: ServiceService,
    private modalService: NgbModal,
    private http: HttpClient) { }

  ngOnInit() {
      this.getEvaPreguntas();
      this.getEvaRespuestas();
      this.preguntas = new Array<Respuestas>();
      this.pregunta = new Respuestas();
      this.preguntaSeleccionada = new Respuestas();
      console.log(this.preguntas);
      console.log(this.preguntaSeleccionada);
  }
//   getEvaPregunta() {
//     this.spinner.show();
//     this.service.get('evaluacion_preguntas').subscribe(
//         (response) => {
//             this.preguntas = response['preguntas'];
//             console.log(response);
//             this.spinner.hide();
//             // this.preguntas.forEach((result) => {
//             //     this.respuesta.push(result.orden);
//             //     // console.log(this.respuesta);
//             //     // tslint:disable-next-line:triple-equals
//             //     this.validacion = result.orden;
//             //     // console.log(this.respuesta);
//             //     // console.log(this.validacion);
//             // });
//         },
//         (Error) => {
//             this.spinner.hide();
//             console.log('error');
//         }
//     );
// }
getEvaPreguntas() {
    this.http.get<any>(environment.API_URL + 'evaluacion_preguntas').subscribe(data => {
        this.resultados = data['preguntas'];
        console.log(this.resultados);
    });
}
getEvaRespuestas() {
    this.http.get<any>(environment.API_URL + 'eva_respuestas').subscribe(response => {
        this.respuestas = response;
        console.log(this.respuestas);
    });
}

crear() {
    console.log(this.preguntaSeleccionada.orden);
    console.log(this.preguntaSeleccionada.eva_pregunta);
    console.log(this.preguntaSeleccionada.eva_respuesta);
    this.tablas = {'orden': this.preguntaSeleccionada.orden,
    'eva_pregunta': {'id': this.preguntaSeleccionada.eva_pregunta},
    'eva_respuesta': {'id': this.preguntaSeleccionada.eva_respuesta}};
    // this.pregunta = {
    //     orden: this.preguntaSeleccionada.orden,
    //     eva_pregunta: this.preguntaSeleccionada.eva_pregunta,
    //     eva_respuesta: this.preguntaSeleccionada.eva_respuesta
    // };
    // this.http.post(environment.API_URL + 'pregunta_respuesta', this.pregunta).subscribe(data => {
    //     console.log(data);
    //     console.log('guardado');
    // });
    this.spinner.show();
            this.service
                .post('pregunta_respuesta', {
                    eva_pregunta_eva_respuesta: this.tablas
                })
                .subscribe(
                    (response) => {
                        this.spinner.hide();
                        this.preguntaSeleccionada = new Respuestas();
                        console.log('creado');
                        // this.getEvaPregunta();
                        // this.router.navigate(['eva-pregunta']);
                    },
                    (Error) => {
                        this.spinner.hide();
                        console.log('error');
                    }
                );
}


}

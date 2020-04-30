import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-admin-resultados',
  templateUrl: './admin-resultados.component.html',
  styleUrls: ['./admin-resultados.component.scss']
})
export class AdminResultadosComponent implements OnInit {
    respuesta: any = [];
    resultado: any = [];
    valores: any = [];
    // codigo: any = [];
    chart: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    //   this.traerRespuestas();
    this.getResultados();
  }
//   traerRespuestas() {
//     // tslint:disable-next-line: deprecation
//     this.http.get<any>(environment.API_URL + 'admin-respuestas').subscribe(data => {
//       this.respuesta = data['admin-respuestas'];
//         this.respuesta.forEach(result => {
//             console.log(this.respuesta);
//             console.log(result);
//             this.resultado.push(result.nombre);
//             this.valores.push(result.valor);
//             // this.codigo.push(result.codigo);
//             this.chart = new Chart('canvas', {
//                 type: 'line',
//                 data: {
//                     labels:  this.resultado,
//                     datasets: [{
//                         label: 'docentes',
//                         data: this.valores,
//                         borderColor: '#3e95cd',
//                         fill: false,
//                         backgroundColor: [
//                             'red',
//                             'red',
//                             'red',
//                             'red'
//                         ],

//                     },
//                 ]
//                 }
//             });
//         });
//      });
//   }
  getResultados() {
    this.http.get<any>(environment.API_URL + 'respuestas').subscribe(data => {
        this.respuesta = data['resultados'];
        console.log(data);
        this.respuesta.forEach(result => {

            console.log(this.respuesta);
            console.log(result);
            this.resultado.push(result.eva_pregunta_eva_respuesta.eva_pregunta_id);
            // this.valores.push(result.docente_asignatura.docente_id);
            this.valores.push(result.eva_pregunta_eva_respuesta.eva_respuesta_id);
            this.chart = new Chart('canvas', {
                type: 'line',
                data: {
                labels: this.resultado,
                datasets: [{
                    label: 'docentes',
                    data: this.valores,
                    borderColor: '#3e95cd',
                    fill: false,
                    backgroundColor: [
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                        'red',
                    ]
                }]
                }
            });
        });
    });
}

}

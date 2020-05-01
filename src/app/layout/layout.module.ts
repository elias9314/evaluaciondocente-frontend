import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import { AdminEstudianteComponent } from './matriculacion/admin-estudiante/admin-estudiante.component';
import { FiltrosPipe } from './matriculacion/pipes/filtros.pipe';
import { AdminResultadosComponent } from './matriculacion/admin-resultados/admin-resultados.component';
import { ChartsModule } from 'ng2-charts';
import { AdminDocentesComponent } from './matriculacion/admin-docentes/admin-docentes.component';

import { PerfilDocenteComponent } from './matriculacion/perfil-docente/perfil-docente.component';
import { TipoEvaluacionComponent } from './matriculacion/tipo-evaluacion/tipo-evaluacion.component';
import { EvaPreguntaComponent } from './matriculacion/eva-pregunta/eva-pregunta.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { DatosDocenteComponent } from './matriculacion/perfil-docente/datos-docente/datos-docente.component';

import { AdminEvaluacionComponent } from './matriculacion/admin-evaluacion/admin-evaluacion.component';
import { PreguntaRespuestaComponent } from './matriculacion/pregunta-respuesta/pregunta-respuesta.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        ChartsModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ],

    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, AdminEstudianteComponent, FiltrosPipe, AdminResultadosComponent,
         AdminDocentesComponent, PerfilDocenteComponent,
         TipoEvaluacionComponent,
         EvaPreguntaComponent,

         DatosDocenteComponent,

         AdminEvaluacionComponent,

         PreguntaRespuestaComponent]

})
export class LayoutModule {
}

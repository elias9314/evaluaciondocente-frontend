import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import { AdminEstudianteComponent } from './matriculacion/admin-estudiante/admin-estudiante.component';
import { FiltrosPipe } from './matriculacion/pipes/filtros.pipe';
import { AdminResultadosComponent } from './matriculacion/admin-resultados/admin-resultados.component';
import { ChartsModule } from 'ng2-charts';
import { AdminDocentesComponent } from './matriculacion/admin-docentes/admin-docentes.component';
<<<<<<< HEAD
import { PerfilDocenteComponent } from './matriculacion/perfil-docente/perfil-docente.component';
=======
import { TipoEvaluacionComponent } from './matriculacion/tipo-evaluacion/tipo-evaluacion.component';
>>>>>>> 8894340a03e97f3624a4b081485462b365cd969a
@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        ChartsModule
    ],
<<<<<<< HEAD
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, AdminEstudianteComponent, FiltrosPipe, AdminResultadosComponent, AdminDocentesComponent, PerfilDocenteComponent]
=======
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, AdminEstudianteComponent, FiltrosPipe, AdminResultadosComponent,
         AdminDocentesComponent,
         TipoEvaluacionComponent]
>>>>>>> 8894340a03e97f3624a4b081485462b365cd969a
})
export class LayoutModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AdminEvaluacionRoutingModule} from './admin-evaluacion-routing.module';
import {AdminEvaluacionComponent} from './admin-evaluacion.component';

@NgModule({
    imports: [CommonModule, AdminEvaluacionRoutingModule, NgbModule, FormsModule],
    declarations: [
      AdminEvaluacionComponent,
    ]
  })
  export class AdminEvaluacionModule {
  }

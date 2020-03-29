import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEvaluacionComponent} from './admin-evaluacion.component';

const routes: Routes = [
    {
        path: '',
        component: AdminEvaluacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminEvaluacionRoutingModule {}

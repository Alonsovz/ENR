
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CodigoTipoENRComponent } from './components/codigo-tipo-enr/codigo-tipo-enr.component';
import { MetodologiaCalculoComponent } from './components/metodologia-calculo/metodologia-calculo.component';
import { DatosENRComponent } from './components/datos-enr/datos-enr.component';


const routes: Routes = [
  {path: 'testlaravel1', component: TestComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'gestiones', component: CodigoTipoENRComponent },
  {path: 'metodologiaCalc', component: MetodologiaCalculoComponent },
  {path: 'datosENR', component: DatosENRComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

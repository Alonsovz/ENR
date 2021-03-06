
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CodigoTipoENRComponent } from './components/codigo-tipo-enr/codigo-tipo-enr.component';
import { MetodologiaCalculoComponent } from './components/metodologia-calculo/metodologia-calculo.component';
import { DatosENRComponent } from './components/datos-enr/datos-enr.component';
import { RepositorioENRComponent } from './components/repositorio-enr/repositorio-enr.component';
import { LoginComponent } from './login/login.component';
import { CredencialesGuard } from './login/credenciales.guard';
import { RepositorioGlobalComponent } from './components/repositorio-global/repositorio-global.component';


const routes: Routes = [
  {path: 'repositorioGlobal', component: RepositorioGlobalComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'gestiones', component: CodigoTipoENRComponent },
  {path: 'metodologiaCalc', component: MetodologiaCalculoComponent },
  {path: 'datosENR', component: DatosENRComponent },
  {path: 'repositorioENR', component: RepositorioENRComponent },
  {path: 'login', component: LoginComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'login' },
  {path: '', pathMatch: 'full', canActivate: [CredencialesGuard], redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

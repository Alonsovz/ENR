
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CodigoTipoENRComponent } from './components/codigo-tipo-enr/codigo-tipo-enr.component';
import { MetodologiaCalculoComponent } from './components/metodologia-calculo/metodologia-calculo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatosENRComponent } from './components/datos-enr/datos-enr.component';
import { NgxMaskModule } from 'ngx-mask';
import { RepositorioENRComponent } from './components/repositorio-enr/repositorio-enr.component';
import { LoginComponent } from './login/login.component';
import { CredencialesGuard } from './login/credenciales.guard';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SidebarComponent,
    WrapperComponent,
    DashboardComponent,
    CodigoTipoENRComponent,
    MetodologiaCalculoComponent,
    DatosENRComponent,
    RepositorioENRComponent,
    LoginComponent,
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    CredencialesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

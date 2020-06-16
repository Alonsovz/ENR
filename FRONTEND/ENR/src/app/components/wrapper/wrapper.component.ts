import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CredencialesService } from 'src/app/service/credenciales.service';
import { Observable } from 'rxjs';
import { element } from 'protractor';
declare const $;

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  user: Usuario = new Usuario();

  isLoggedIn$ : Observable<boolean>;
  isusuarioLogueado$ : Observable<Usuario>;

  constructor(private router: Router, private usuarioservice : CredencialesService,
    private crf: ChangeDetectorRef,) { }
 
  ngOnInit() {
   this.crf.detectChanges();
    this.isLoggedIn$ = this.usuarioservice.isLoggedIn;
   this.isusuarioLogueado$ = this.usuarioservice.isusuarioLogueado;
   this.traerCredenciales();
  }

  
  traerCredenciales(){
   // this.crf.detectChanges();
    if(localStorage.getItem('usuario') !== null){
    
      this.isusuarioLogueado$.subscribe(response => {
       // this.user = response;
        this.user = JSON.parse(localStorage.getItem("usuario"));

       // console.log(this.user.alias);
      });
    }
  }
  
  ngAfterViewInit(){
    this.crf.detectChanges();
    if(localStorage.getItem('usuario') !== null){
    
      this.isusuarioLogueado$.subscribe(response => {
       // this.user = response;
        this.user = JSON.parse(localStorage.getItem("usuario"));

        this.traerCredenciales();
      });
    }
    
  }

  
  public cerrarSesion() {

   this.usuarioservice.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  

}

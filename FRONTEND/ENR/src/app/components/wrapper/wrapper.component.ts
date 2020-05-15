import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CredencialesService } from 'src/app/service/credenciales.service';
import { Observable } from 'rxjs';
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

  constructor(private router: Router, private usuarioservice : CredencialesService) { }
 
  ngOnInit() {
    
    this.isLoggedIn$ = this.usuarioservice.isLoggedIn;
   this.isusuarioLogueado$ = this.usuarioservice.isusuarioLogueado;
  }
  
  ngAfterViewInit(){
  
      this.isusuarioLogueado$.subscribe(response => {
        this.user = response;
        console.log(response);
      });
      
 
  }

  
  public cerrarSesion() {

   this.usuarioservice.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  

}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';
import { CredencialesService } from 'src/app/service/credenciales.service';
declare const $;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  contenedor = false;
  usuario: Usuario = new Usuario();
  user: Usuario = new Usuario();

  isLoggedIn$ : Observable<boolean>;
  isusuarioLogueado$ : Observable<Usuario>;
  constructor(private router: Router, private crf: ChangeDetectorRef,
    private usuarioservice : CredencialesService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.usuarioservice.isLoggedIn;
  }

  ngAfterViewChecked(){
 
  if(localStorage.getItem('usuario') !== null){
    this.usuarioservice.loggedIn.next(true);
    this.isLoggedIn$ = this.usuarioservice.isLoggedIn;
    //this.crf.detectChanges();
    
  }
 }


 

}

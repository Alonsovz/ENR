import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  contenedor = false;
  usuario: Usuario = new Usuario();
  @ViewChild(SidebarComponent, {static: false}) side: SidebarComponent;
  
  constructor(private router: Router) { }
  ngOnInit() {
    localStorage.clear();
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }
  
  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem('usuario'))) {
      this.contenedor = true;
     this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }



  
  public cerrarSesion() {

    this.contenedor = false;

    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this.router.navigate(['login']);

   this.side.hideContenedor();
  }

  

}

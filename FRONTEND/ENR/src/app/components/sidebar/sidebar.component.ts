import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  contenedor = false;
  usuario: Usuario = new Usuario();
  
  constructor(private router: Router, private crf: ChangeDetectorRef) { }

  ngOnInit() {
  //SlocalStorage.clear();

 this.contenedor = false;

  }
  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem('usuario'))) {
      this.contenedor = true;
     this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  public hideContenedor() {
    this.contenedor = false;
  }


  public cerrarSesion() {

    this.crf.detectChanges();

    localStorage.clear();
    this.router.navigate(['login']);
    this.contenedor = false;
    //this.rol = '';
  }

}

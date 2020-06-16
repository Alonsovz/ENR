import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import notie from 'notie';
import { CredencialesService } from '../service/credenciales.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
    // objeto usuario para formulario de logueo
    usuariodto: Usuario = new Usuario();

    // objeto global para LocalStorage
    usuariosesion: Usuario = new Usuario();
  
    // establecemos el submit del formulario en false
    submitted = false;

    @ViewChild(SidebarComponent ,{static: false}) side: SidebarComponent;

  
constructor(private usuarioservice: CredencialesService, private router: Router) { 
  
}

  ngOnInit() {
    // limpiamos las variables que puedan haber quedado en el localStorage
    localStorage.clear();
    this.usuarioservice.loggedIn.next(false);
  }


  // metodo para submit del formulario de login
  onSubmit() {
    this.submitted = true;
    
  }

  // evento submit de boton para formulario
  onClickSubmit(usuario) {
    //localStorage.clear();
    // llamada al service para validar las credenciales
    this.usuarioservice.login(usuario).subscribe(
      response => {
        this.usuariosesion = response;

       
        localStorage.setItem('usuario', JSON.stringify(this.usuariosesion));
       // localStorage.setItem('rol', JSON.stringify(this.usuariosesion.rol_id));
       // console.log(this.usuariosesion);
       
      },
      err => {
        

      },
      () => {
        let obj = this.usuariosesion;


        if( Object.keys(obj).length === 0){

          notie.alert({ 
            type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
            text: 'Error al validar credenciales!',
            stay: false, // optional, default = false
            time: 2, // optional, default = 3, minimum = 1,
            position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
          });
        
        }else{
          this.usuarioservice.loggedIn.next(true);
          this.usuarioservice.usuariologueado.next(obj);

         //console.log(this.usuariosesion);
          this.router.navigate(['dashboard']);
        
        }
       
      },
    );
  }

  // limpiar formulario
  get diagnostic() { return JSON.stringify(this.usuariodto); }

  // metodo para validar credenciales
  public login(usuario: Usuario) {

  }

}

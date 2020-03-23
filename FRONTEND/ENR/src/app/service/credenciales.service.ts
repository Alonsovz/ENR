import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  // metodo para validar credenciales
  public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'usuario', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }

  // metodo para cerrar sesion
  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

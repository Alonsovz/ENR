import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repositorio } from '../models/repositorio';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient, private url: GlobalService) { }

  public getUrlBackEnd() {
    return 'http://localhost:8000/';
  }


  public getPagosENR(){
    return this.http.get(this.getUrlBackEnd() +'getPagosENR').pipe(map(data => data as Repositorio[]));
  }

  public getCasosRed(){
    return this.http.get(this.getUrlBackEnd() +'getCasosRed').pipe(map(data => data as Repositorio[]));
  }

  public getCuadroAcumulado(){
    return this.http.get(this.getUrlBackEnd() +'getCuadroAcumulado').pipe(map(data => data as Repositorio[]));
  }

  public getTotalCuadroAcumulado(){
    return this.http.get(this.getUrlBackEnd() +'getTotalCuadroAcumulado').pipe(map(data => data as Repositorio[]));
  }
  
  public getCasosIng(){
    return this.http.get(this.getUrlBackEnd() +'getCasosIng').pipe(map(data => data as Repositorio[]));
  }

  public getCasosCalc(){
    return this.http.get(this.getUrlBackEnd() +'getCasosCalc').pipe(map(data => data as Repositorio[]));
  }

  public getCasosNoti(){
    return this.http.get(this.getUrlBackEnd() +'getCasosNoti').pipe(map(data => data as Repositorio[]));
  }

  public getCasosEl(){
    return this.http.get(this.getUrlBackEnd() +'getCasosEl').pipe(map(data => data as Repositorio[]));
  }

 
}

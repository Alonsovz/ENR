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
}

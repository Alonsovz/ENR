import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { codigos } from '../models/codigos';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CodigoENRService {

  constructor(private http: HttpClient, private url: GlobalService) { }

 
  public getCodigoENR(): Observable<codigos[]> {
    return this.http.get(this.url.getUrlBackEnd() + 'getCodigoENR').pipe(map(data => data as codigos[]));
  }
  public getCodigosCargos(): Observable<codigos[]> {
    return this.http.get(this.url.getUrlBackEnd() + 'getCodigosCargos').pipe(map(data => data as codigos[]));
  }
  
  public saveCodigos(codigo: codigos): Observable<codigos> {
    return this.http.post<codigos>(this.url.getUrlBackEnd() + 'saveCodigoENR', codigo).pipe(map(data => data as codigos));
  }

  public updateCodigos(codigo: codigos): Observable<codigos> {
   // console.log(codigo);
    return this.http.post<codigos>(this.url.getUrlBackEnd() + 'updateCodigoENR', codigo).pipe(map(data => data as codigos));
  }

  public deleteCodigos(codigo: codigos): Observable<codigos> {
    // console.log(codigo);
     return this.http.post<codigos>(this.url.getUrlBackEnd() + 'deleteCodigoENR', codigo).pipe(map(data => data as codigos));
   }
}

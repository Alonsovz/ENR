import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { metodologia } from '../models/metodologiaCal';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class MetodologiaCalcService {

  constructor(private http: HttpClient, private url: GlobalService) { }

  
  public getMetodologiaCalc(): Observable<metodologia[]> {
    return this.http.get(this.url.getUrlBackEnd() +'getMetodologiaCalc').pipe(map(data => data as metodologia[]));
  }

  public saveMetodologia(metodo: metodologia): Observable<metodologia> {
    return this.http.post<metodologia>(this.url.getUrlBackEnd() + 'saveMetodologia', metodo).pipe(map(data => data as metodologia));
  }

  public updateMetodologia(metodo: metodologia): Observable<metodologia> {
   // console.log(metodo);
    return this.http.post<metodologia>(this.url.getUrlBackEnd() + 'updateMetodologia', metodo).pipe(map(data => data as metodologia));
  }

  public deleteMetodologia(metodo: metodologia): Observable<metodologia> {
    // console.log(metodo);
     return this.http.post<metodologia>(this.url.getUrlBackEnd() + 'deleteMetodologia', metodo).pipe(map(data => data as metodologia));
   }
}

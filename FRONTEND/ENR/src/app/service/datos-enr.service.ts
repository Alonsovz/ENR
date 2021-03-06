import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { DatosENR } from '../models/datos-enr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosENRService {

  constructor(private http: HttpClient, private url: GlobalService) { }

  public getDatosbyNIS(nis): Observable<DatosENR[]> {
    //console.log(nis);
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getDatosbyNIS', nis).pipe(map(data => data as DatosENR[]));
  }


  public getOrdenesbyNIS(nis): Observable<DatosENR[]> {
    //console.log(nis);
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getOrdenesbyNIS', nis).pipe(map(data => data as DatosENR[]));
  }
  

  
  public getOtbyNis(nis): Observable<DatosENR[]> {
    //console.log(nis);
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getOtbyNis', nis).pipe(map(data => data as DatosENR[]));
  }


  public getNumeroMedidor(nis): Observable<DatosENR[]> {
    //console.log(nis);
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getNumeroMedidor', nis).pipe(map(data => data as DatosENR[]));
  }

  
  public getLecturasbyNISum(nis): Observable<DatosENR[]> {
    //console.log(nis);
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getLecturasbyNISum', nis).pipe(map(data => data as DatosENR[]));
  }

  public getDiasRetroactivos(codigo) : Observable<DatosENR[]>{
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getDiasRetroactivos', codigo).pipe(map(data => data as DatosENR[]));
  }

  public saveDatosNISGenerales(datos: DatosENR): Observable<DatosENR> {
    //console.log(datos);
    return this.http.post<DatosENR>(this.url.getUrlBackEnd() + 'saveDatosNISGenerales', datos).pipe(map(data => data as DatosENR));
  }


  public saveDocProbatoria(datos: DatosENR): Observable<DatosENR> {
    //console.log(datos);
    return this.http.post<DatosENR>(this.url.getUrlBackEnd() + 'saveDocProbatoria', datos).pipe(map(data => data as DatosENR));
  }

  public saveDocOT(datos: DatosENR): Observable<DatosENR> {
    //console.log(datos);
    return this.http.post<DatosENR>(this.url.getUrlBackEnd() + 'saveDocOT', datos).pipe(map(data => data as DatosENR));
  }


  public getAdjuntosOrdenes(orden): Observable<DatosENR[]> {
    //console.log(orden);
    return this.http.post<DatosENR[]>(this.url.getUrlBackEnd() + 'getAdjuntosOrdenes', orden).pipe(map(data => data as DatosENR[]));
  }


  public eliminarArchivo(datos: DatosENR): Observable<DatosENR> {
    //console.log(datos);
    return this.http.post<DatosENR>(this.url.getUrlBackEnd() + 'eliminarArchivo', datos).pipe(map(data => data as DatosENR));
  }


  public updateDatosNISGenerales(datos: DatosENR): Observable<DatosENR> {
    //console.log(datos);
    return this.http.post<DatosENR>(this.url.getUrlBackEnd() + 'updateDatosNISGenerales', datos).pipe(map(data => data as DatosENR));
  }
  

  public updateDocProbatoria(datos: DatosENR): Observable<DatosENR> {
    //console.log(datos);
    return this.http.post<DatosENR>(this.url.getUrlBackEnd() + 'updateDocProbatoria', datos).pipe(map(data => data as DatosENR));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Repositorio } from '../models/repositorio';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositorioEnrService {

  constructor(private http: HttpClient, private url: GlobalService) { }

  public getRepositorioIngresados(): Observable<Repositorio[]> {
    return this.http.get(this.url.getUrlBackEnd() +'getRepositorioIngresados').pipe(map(data => data as Repositorio[]));
  }

  public getRepositorioCalculados(): Observable<Repositorio[]> {
    return this.http.get(this.url.getUrlBackEnd() +'getRepositorioCalculados').pipe(map(data => data as Repositorio[]));
  }

  public getRepositorioNotificados(): Observable<Repositorio[]> {
    return this.http.get(this.url.getUrlBackEnd() +'getRepositorioNotificados').pipe(map(data => data as Repositorio[]));
  }

  public getAdjuntosOrdenesENR(orden): Observable<Repositorio[]> {
    //console.log(orden);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getAdjuntosOrdenesENR', orden).pipe(map(data => data as Repositorio[]));
  }


  public eliminarArchivo(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'eliminarArchivoENR', datos).pipe(map(data => data as Repositorio));
  }

  public eliminarArchivoOT(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'eliminarArchivo', datos).pipe(map(data => data as Repositorio));
  }


  public getDatosENR(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getDatosENR', nis).pipe(map(data => data as Repositorio[]));
  }


  public cambiarScan(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'cambiarScanENR', datos).pipe(map(data => data as Repositorio));
  }


  public getScan(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getScan', nis).pipe(map(data => data as Repositorio[]));
  }


  public getLecturasbyNIS(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getLecturasbyNIS', nis).pipe(map(data => data as Repositorio[]));
  }

}

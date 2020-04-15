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

  public getFechaInicioTarifa(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getFechaInicioTarifa', nis).pipe(map(data => data as Repositorio[]));
  }

  public getFechaFinTarifa(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getFechaFinTarifa', nis).pipe(map(data => data as Repositorio[]));
  }

  public getTarifasFechas(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getTarifasFechas', nis).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoEstimado(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoEstimado', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoRegistrado(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoRegistrado', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getTarifasFechasTotal(nis): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getTarifasFechasTotal', nis).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoEstimadoTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoEstimadoTotal', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoRegistradoTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoRegistradoTotal', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotal', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR1erBloque(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloque', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR2doBloque(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloque', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR3erBloque(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloque', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR1erBloqueTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueTotal', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR2doBloqueTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueTotal', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR3erBloqueTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueTotal', kwh).pipe(map(data => data as Repositorio[]));
  }




  public getConsumoENRTotalGlobal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalGlobal', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotalFechas(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalFechas', kwh).pipe(map(data => data as Repositorio[]));
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

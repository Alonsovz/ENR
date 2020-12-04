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

  public getRepositorioRecibidosCliente(): Observable<Repositorio[]> {
    return this.http.get(this.url.getUrlBackEnd() +'getRepositorioRecibidosCliente').pipe(map(data => data as Repositorio[]));
  }

  public getRepositorioEliminados(): Observable<Repositorio[]> {
    return this.http.get(this.url.getUrlBackEnd() +'getRepositorioEliminados').pipe(map(data => data as Repositorio[]));
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
  

  

  public getConsumoENR1erBloqueEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR2doBloqueEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR3erBloqueEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR1erBloqueTotalEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueTotalEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR2doBloqueTotalEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueTotalEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR3erBloqueTotalEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueTotalEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }




  public getConsumoENRTotalGlobalEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalGlobalEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotalFechasEnergia(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalFechasEnergia', kwh).pipe(map(data => data as Repositorio[]));
  }
  

  public getConsumoENR1erBloqueDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR2doBloqueDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR3erBloqueDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR1erBloqueTotalDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueTotalDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }



  public getConsumoENR2doBloqueTotalDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueTotalDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR3erBloqueTotalDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueTotalDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }






  public getConsumoENRTotalGlobalDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalGlobalDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotalFechasDistribucion(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalFechasDistribucion', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRBloqueEnergia1G(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueEnergia1G', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRBloqueDistribucion1G(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueDistribucion1G', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRBloqueDistribucion1GTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueDistribucion1GTotal', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRBloqueEnergia1GTotal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueEnergia1GTotal', kwh).pipe(map(data => data as Repositorio[]));
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

  public saveDatosCalCaso1(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'saveDatosCalCaso1', datos).pipe(map(data => data as Repositorio));
  }

  public saveDatosCalCaso6(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'saveDatosCalCaso6', datos).pipe(map(data => data as Repositorio));
  }
  public updateDatosCalCaso1(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'updateDatosCalCaso1', datos).pipe(map(data => data as Repositorio));
  }


  public saveDatosCalCaso2(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'saveDatosCalCaso2', datos).pipe(map(data => data as Repositorio));
  }

  public updateDatosCalCaso2(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'updateDatosCalCaso2', datos).pipe(map(data => data as Repositorio));
  }


  public savePeriodosSeleccionadosCaso2 (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'savePeriodosSeleccionadosCaso2', datos).pipe(map(data => data as Repositorio));
  }

  public consumosRealesCaso3 (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'consumosRealesCaso3', datos).pipe(map(data => data as Repositorio));
  }


  public consumosRealesCaso3Totales (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'consumosRealesCaso3Totales', datos).pipe(map(data => data as Repositorio));
  }

  public savePeriodosSeleccionadosCaso3 (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'savePeriodosSeleccionadosCaso3', datos).pipe(map(data => data as Repositorio));
  }


  public updateDatosCalCaso3(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'updateDatosCalCaso3', datos).pipe(map(data => data as Repositorio));
  }


  public savePeriodosSeleccionadosCaso4 (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'savePeriodosSeleccionadosCaso4', datos).pipe(map(data => data as Repositorio));
  }

  public saveDatosCalCaso4(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'saveDatosCalCaso4', datos).pipe(map(data => data as Repositorio));
  }


  public saveDatosCalCaso5(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'saveDatosCalCaso5', datos).pipe(map(data => data as Repositorio));
  }


  public savePeriodosSeleccionadosCaso5 (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'savePeriodosSeleccionadosCaso5', datos).pipe(map(data => data as Repositorio));
  }


  public updateDatosCalCaso5(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'updateDatosCalCaso5', datos).pipe(map(data => data as Repositorio));
  }

  public cobroMedidor(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'cobroMedidor', datos).pipe(map(data => data as Repositorio));
  }


  public getDatosImprimir(caso): Observable<Repositorio[]> {
    //console.log(orden);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getDatosImprimir', caso).pipe(map(data => data as Repositorio[]));
  }


  public multiplesArchivos(caso): Observable<Repositorio[]> {
    //console.log(orden);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'multiplesArchivos', caso).pipe(map(data => data as Repositorio[]));
  }

  public anexoCalculo(caso): Observable<Repositorio[]> {
    //console.log(orden);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'anexoCalculo',caso).pipe(map(data => data as Repositorio[]));
  }
 
  public repositorioGlobal(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'repositorioGlobal', kwh).pipe(map(data => data as Repositorio[]));
  }


  public eliminarCaso(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'eliminarCaso', datos).pipe(map(data => data as Repositorio));
  }


  public savePeriodosSeleccionadosCaso6 (datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'savePeriodosSeleccionadosCaso6', datos).pipe(map(data => data as Repositorio));
  }

  public getTarifasFechasCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getTarifasFechasCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getTarifasFechasTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getTarifasFechasTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  
  public getConsumoEstimadoCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoEstimadoCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoEstimadoTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoEstimadoTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoRegistradoCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoRegistradoCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoRegistradoTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoRegistradoTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENRCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR1erBloqueCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR2doBloqueCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR3erBloqueCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR1erBloqueTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR2doBloqueTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR3erBloqueTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotalFechasCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalFechasCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRTotalGlobalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalGlobalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENR1erBloqueEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR2doBloqueEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR3erBloqueEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR1erBloqueTotalEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueTotalEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR2doBloqueTotalEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueTotalEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR3erBloqueTotalEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueTotalEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  

  public getConsumoENRTotalFechasEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalFechasEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENRTotalGlobalEnergiaCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalGlobalEnergiaCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR1erBloqueDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR2doBloqueDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR3erBloqueDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENR1erBloqueTotalDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR1erBloqueTotalDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR2doBloqueTotalDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR2doBloqueTotalDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENR3erBloqueTotalDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENR3erBloqueTotalDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENRTotalFechasDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalFechasDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENRTotalGlobalDistribucionCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRTotalGlobalDistribucionCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getConsumoENRBloqueDistribucion1GCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueDistribucion1GCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENRBloqueEnergia1GCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueEnergia1GCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }


  public getConsumoENRBloqueEnergia1GTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueEnergia1GTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }
  public getConsumoENRBloqueDistribucion1GTotalCalculo(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getConsumoENRBloqueDistribucion1GTotalCalculo', kwh).pipe(map(data => data as Repositorio[]));
  }

  public getTotalesCobro(kwh): Observable<Repositorio[]> {
    //console.log(nis);
    return this.http.post<Repositorio[]>(this.url.getUrlBackEnd() + 'getTotalesCobro', kwh).pipe(map(data => data as Repositorio[]));
  }


  public guardarDatosRecibidoCliente(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'guardarDatosRecibidoCliente', datos).pipe(map(data => data as Repositorio));
  }


  public guardarSeleccionEE(datos: Repositorio): Observable<Repositorio> {
    //console.log(datos);
    return this.http.post<Repositorio>(this.url.getUrlBackEnd() + 'guardarSeleccionEE', datos).pipe(map(data => data as Repositorio));
  }

}


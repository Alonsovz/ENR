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
}

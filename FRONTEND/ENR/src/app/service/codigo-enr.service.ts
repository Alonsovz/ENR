import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { codigos } from '../models/codigos';

@Injectable({
  providedIn: 'root'
})
export class CodigoENRService {

  constructor(private http: HttpClient) { }

  // obtener los reclamos filtrado por FE y OC
  public getCodigoENR(): Observable<codigos[]> {
    return this.http.get('http://localhost:8000/api/getCodigoENR').pipe(map(data => data as codigos[]));
  }

}

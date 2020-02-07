import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { metodologia } from '../models/metodologiaCal';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetodologiaCalcService {

  constructor(private http: HttpClient) { }

  // obtener los reclamos filtrado por FE y OC
  public getMetodologiaCalc(): Observable<metodologia[]> {
    return this.http.get('http://localhost:8000/api/getMetodologiaCalc').pipe(map(data => data as metodologia[]));
  }
}

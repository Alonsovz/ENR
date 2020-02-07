import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  // obtenemos la variable laravel
  public getLaravelVar(): Observable<string> {
    return this.http.get('http://localhost:8000/api/test').pipe(map(data => data as string));
  }
}

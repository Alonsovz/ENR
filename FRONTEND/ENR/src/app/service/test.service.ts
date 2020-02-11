import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private url: GlobalService) { }

  // obtenemos la variable laravel
  public getLaravelVar(): Observable<string> {
    return this.http.get(this.url.getUrlBackEnd() +'test').pipe(map(data => data as string));
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public getUrlBackEnd() {
    return 'http://localhost:8000/';
  }
}

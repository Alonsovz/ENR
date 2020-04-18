import { Injectable, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class CredencialesGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('usuario') === null) {
      this.router.navigate(['login']);
      
      return false;
    }
    return true;
  }
}

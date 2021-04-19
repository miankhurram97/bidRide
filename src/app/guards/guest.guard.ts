import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userCredential') && localStorage.getItem('currentUser')) {
      if (localStorage.getItem('userCredential') !== '' && localStorage.getItem('currentUser') !== '') {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }

  }

}

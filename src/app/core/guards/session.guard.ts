import { Component, inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  cookieService=inject(CookieService);

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession()
  }

  checkCookieSession():boolean {
    try {
      const token: boolean = this.cookieService.check('token')
      if(!token){
        this.router.navigate(['/', 'auth'])
      }
      return token
      
    } catch (error) {
      console.log(error);
      return false
    }
    
  }
  
}

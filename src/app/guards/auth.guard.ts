import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { showAlert } from 'src/helpers/alert';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authServise: AuthService,
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      const { getToken } = this.authServise;
      if(getToken() === '' || getToken() === null, getToken() === undefined){
        showAlert('No permissions', 'You have not permission for visit that page', 'warning');
        this.router.navigate(['/']);
      }
    return true;
  }
  
}

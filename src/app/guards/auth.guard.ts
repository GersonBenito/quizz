import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { showAlert } from 'src/helpers/alert';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.getToken() === '' || this.userService.getToken() === null, this.userService.getToken() === undefined){
        showAlert('No permissions', 'You have not permission for visit that page', 'warning');
        this.router.navigate(['/']);
      }
    return true;
  }
  
}

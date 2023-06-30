import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private auth:AuthService, private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auth.userLog) {
        //console.log('user guard', this.user)
        return true;
      }
      else {
        Swal.fire({
          icon: 'warning',
          title: 'Debe estar logeado para acceder a esa sección.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['']);
        return false;
      }

      
    }

  
}

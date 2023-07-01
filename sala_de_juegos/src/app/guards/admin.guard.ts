import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) {
    this.auth.userData.subscribe((res:any) => {
      console.log('res en guard', res);
      if (!res) {
        this.router.navigate(['']);
      }
      if (res.perfil == 'administrador') {
        this.auth.admin = true;
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.admin) {
        //console.log('user guard', this.user)
        return true;
      }
      else {
        Swal.fire({
          icon: 'warning',
          title: 'Debe ser administrador para acceder a esa sección.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['']);
        return false;
      }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:any = {};
  userLogged:boolean = false;
  logButton!:string;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe((res:any) => {
      if(res) {
        this.logButton = 'Log Out';
        this.user = res;
        this.userLogged = true;
      }
      else {
        this.logButton = 'Log In';
        this.user = null;
      }
    });
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    console.log('hola');
    setTimeout(() => {
      this.userLogged = false;
      this.user = null;
      this.logButton = 'Log In'
      this.auth.logout();
      this.router.navigateByUrl('/login');
    }, 1000);
  }
}

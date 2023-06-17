import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials!:FormGroup;
  user:any;
  email:string|undefined;
  password:string|undefined;
  loginIcon:string = 'https://icons-for-free.com/iconfiles/ico/256/home+page+profile+user+icon-1320184041392976124.ico';

  constructor(private auth:AuthService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.auth.userData.subscribe((res:any) => {
      if(res) {
        this.user = res;
        console.log('user', this.user);
      }
    })
  }

  async login() {
    if(this.email != null && this.password != null) { 
      this.auth.login(this.credentials.value)
      .then(() => {
        Swal.fire(
          'Bienvenido!',
          'Sesión iniciada',
          'success'
          );
          this.router.navigate(['']);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos incorrectos',
          });
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltaron completar campos!',
      });
    }
  }

  onChange(value:any) {
    if(value.target.value === 'user1') {
      this.email = 'juancarlos@mail.com';
      this.password = '123456';
    }
    else {
      this.email = 'anamaria@mail.com';
      this.password = '123456';
    }
  }

  
}

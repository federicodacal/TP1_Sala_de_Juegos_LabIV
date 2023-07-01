import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private auth:AuthService, private router:Router, private fb:FormBuilder, private spinner:NgxSpinnerService) { }

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
      this.spinner.show();
      this.auth.login(this.credentials.value)
      .then(() => {

        setTimeout(() => {
          Swal.fire(
            'Bienvenido! ',
            `Bienvenid@ ${this.user.name}!`,
            'success'
            );
            this.spinner.hide();
            this.router.navigate(['']);
          }, 2000);
        })
        .catch(() => {
          this.spinner.hide();
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
    else if(value.target.value === 'user2') {
      this.email = 'anamaria@mail.com';
      this.password = '123456';
    }
    else {
      this.email = 'administrador@admin.com';
      this.password = '123456';
    }
  }

  
}

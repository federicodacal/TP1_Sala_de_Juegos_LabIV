import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  credentials!:FormGroup;
  loginIcon:string = 'https://icons-for-free.com/iconfiles/ico/256/home+page+profile+user+icon-1320184041392976124.ico';

  constructor(private auth:AuthService, private router:Router, private fb:FormBuilder, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    if(this.credentials.get('password')?.value === this.credentials.get('confirmPassword')?.value) {

      this.spinner.show();

      const name = this.credentials.get('name')?.value;

      this.auth.register(this.credentials.value)
        .then(user => {
          setTimeout(() => {
            this.spinner.hide();
            this.router.navigateByUrl('', {replaceUrl:true});
            Swal.fire(
              'Registro exitoso.',
              `Te damos la bienvenida, ${name}!`,
              'success'
            );
          }, 1000);
        })
        .catch((err:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un problema',
          });
          console.log('err', err);
          this.spinner.hide();
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe coincidir la clave con la confirmación',
      });
    }
  }

}

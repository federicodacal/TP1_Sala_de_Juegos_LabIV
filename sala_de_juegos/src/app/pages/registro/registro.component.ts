import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  credentials!:FormGroup;
  loginIcon:string = 'https://icons-for-free.com/iconfiles/ico/256/home+page+profile+user+icon-1320184041392976124.ico';

  constructor(private auth:AuthService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    if(this.credentials.get('password')?.value === this.credentials.get('confirmPassword')?.value) {
      const email = await this.auth.register(this.credentials.value);
  
      if(email) {
        this.router.navigateByUrl('/home', {replaceUrl:true});
      }
      else {
        
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe coincidir la clave con la confirmación',
      });
      console.log('');
    }

  }

}

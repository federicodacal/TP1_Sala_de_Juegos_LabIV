import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  user:any = null;
  formulario!:FormGroup;
  name:string|undefined;
  lastName:string|undefined;
  edad:number|undefined;
  telefono:number|undefined;
  puntaje:number = 7;

  loading:boolean = false;

  encuestas:any[] = []

  constructor(private auth:AuthService, private fb:FormBuilder, private router:Router, private db:DatabaseService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {

    this.auth.userData.subscribe(async(res:any) => {
      if(res) {
        this.user = res;
      }
    });

    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      edad: ['', [Validators.required, Validators.max(99), Validators.min(18)]],
      telefono: ['', [Validators.required, Validators.min(9999), Validators.max(9999999999)]],
      juegoPreferido: ['ahorcado'],
      recomendacion: ['', Validators.required]
    });
  }

  async enviar() {
    if(!this.formulario.invalid) {

      this.spinner.show();

      const date = new Date();
      const currentDate = date.toLocaleDateString();

      const respuestas = {
        name: this.formulario.get('name')?.value,
        lastName: this.formulario.get('lastName')?.value,
        edad: this.formulario.get('edad')?.value,
        telefono: this.formulario.get('telefono')?.value,
        userUid: this.user.uid,
        userName: this.user.name,
        juegoPreferido: this.formulario.get('juegoPreferido')?.value,
        recomendacion: this.formulario.get('recomendacion')?.value,
        puntaje: this.puntaje,
        date: currentDate
      }

      this.db.addEncuesta(respuestas)
        .then(() => {
          setTimeout(() => {

            Swal.fire(
              'Muchas Gracias por completar nuestra encuesta!',
              `Los resultados fueron guardados`,
              'success'
            );

            this.router.navigateByUrl('', {replaceUrl:true});

            this.spinner.hide();

          }, 1000);
        })
        .catch(err => {
          Swal.fire(
            'Ocurrió un problema',
            'error'
          );
          this.spinner.hide();
          console.log('err', err);
        });
    }
    else {
      Swal.fire(
        'Ocurrió un problema',
        'Por favor, revise los campos',
        'error'
      );
    }
  }

  valueChanged($event:any) {
    this.puntaje = $event.target.value;
  }

}

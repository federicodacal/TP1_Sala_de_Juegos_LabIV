import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit, OnDestroy {

  user:any = null;

  ahorcadoListado:any[] = [];
  mayorMenorListado:any[] = [];
  preguntadosListado:any[] = [];
  pingPongListado:any[] = [];

  subAhorcado!:Subscription;
  subMayorMenor!:Subscription;
  subPreguntados!:Subscription;
  subPingPong!:Subscription;

  loading:boolean = false;

  constructor(private auth:AuthService, private db:DatabaseService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subAhorcado = this.db.getResults('ahorcado').subscribe((res:any) => {
      this.ahorcadoListado = res;
    });

    this.subMayorMenor = this.db.getResults('mayor-menor').subscribe((res:any) => {
      this.mayorMenorListado = res;
    });

    this.subPreguntados = this.db.getResults('preguntados').subscribe((res:any) => {
      this.preguntadosListado = res;
    });

    this.subPingPong = this.db.getResults('ping-pong').subscribe((res:any) => {
      this.pingPongListado = res;
    });

    setTimeout(() => {
      this.loading = false;
    }, 2000);

  }


  ngOnDestroy(): void {

  }

}

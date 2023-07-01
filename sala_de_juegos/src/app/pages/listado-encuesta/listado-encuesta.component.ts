import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent implements OnInit {

  user:any = null;
  encuestas:any[] = []

  constructor(private auth:AuthService, private db:DatabaseService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe(async(res:any) => {
      if(res) {
        this.user = res;

        if(this.user.perfil == 'administrador') {
          this.db.getEncuestas().subscribe((res:any) => {
            this.encuestas = res;
          });
        }
      }
    });
  }

}

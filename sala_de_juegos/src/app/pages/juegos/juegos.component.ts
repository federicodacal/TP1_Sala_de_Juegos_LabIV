import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent {

  opt:number=0;

  constructor(private router:Router) { }

  redirigir(opt:number) {
    switch(opt) {
      case 1:
        this.router.navigateByUrl('/juegos/ahorcado');
        break;
      case 2:
        this.router.navigateByUrl('/juegos/mayor-menor');
        break;
      case 3:
        this.router.navigateByUrl('/juegos/preguntados');
        break;
      case 4:
        this.router.navigateByUrl('/juegos/ping-pong');
        break;
    }
  }
}

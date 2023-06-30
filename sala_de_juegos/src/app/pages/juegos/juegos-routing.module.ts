import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { PingPongComponent } from './ping-pong/ping-pong.component';

const routes: Routes = [
    { path: 'ahorcado', component:AhorcadoComponent },
    { path: 'mayor-menor', component:MayorMenorComponent },
    { path: 'preguntados', component:PreguntadosComponent },
    { path: 'ping-pong', component:PingPongComponent }, 
    { path: '', component:JuegosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
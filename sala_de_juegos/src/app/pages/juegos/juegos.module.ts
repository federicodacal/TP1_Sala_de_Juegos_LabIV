import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { JuegosComponent } from './juegos.component';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { PingPongComponent } from './ping-pong/ping-pong.component';

@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    PingPongComponent,
],  
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    JuegosRoutingModule
  ],
  exports: [JuegosComponent],
  providers: []
})
export class JuegosModule {}
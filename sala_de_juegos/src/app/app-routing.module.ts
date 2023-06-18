import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
//import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  { path: 'registro', component:RegistroComponent },
  { path: 'login', component:LoginComponent, },
  { path: 'quien-soy', component:QuienSoyComponent },
  { 
    //path: 'chat', component:ChatComponent
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
  },
  { 
    //path: 'juegos', component:JuegoComponent
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then(m => m.JuegosModule)
  },
  { path: '', component:HomeComponent },
  { path: '**', component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

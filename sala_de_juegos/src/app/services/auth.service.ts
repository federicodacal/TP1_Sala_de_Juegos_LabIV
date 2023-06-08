import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logeado:boolean = false;

  constructor(private authentication:AngularFireAuth) { }

  login(mail:string, password:string) {
    return this.authentication.signInWithEmailAndPassword(mail, password);
  }

  logout() {
    this.logeado = false;
    return this.authentication.signOut();
  }

  log():boolean {
    const authentication = getAuth();
    const user = authentication.currentUser;

    if(user) {
      return true;
    }
    else {
      return false;
    }
  }

  
}

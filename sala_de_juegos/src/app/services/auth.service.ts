import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, switchMap } from 'rxjs';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = {};

  constructor(private authentication:AngularFireAuth, private firestore:Firestore) { 
    this.userData = this.authentication.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          const userRef = doc(this.firestore, `users/${user.uid}`);
          return docData(userRef, {idField:'uid'}) as Observable<any>;
        } else {
          return of(null);
        }
      })
    )
  }

  async register({email, password}:any) {
    try {
      const userAuth = await this.authentication.createUserWithEmailAndPassword(email, password);
      return userAuth;
    }
    catch (err) {
      return null;
    }
  }

  async login({email, password}:any) {
    return this.authentication.signInWithEmailAndPassword(email, password);
  }


  logout() {
    return this.authentication.signOut();
  }

  getUser() {
    return this.authentication.authState;
  }
  
}

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, serverTimestamp } from '@angular/fire/firestore';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentUser: any;

  constructor(private firestore:Firestore, private auth:Auth) { 
    this.auth.onAuthStateChanged(user => {
      //console.log('user: ' + user);
      if(user != null) { 
        this.currentUser = user;
        //console.info('user?', this.currentUser);
      }
    });
  }

  addChatMessage(msg:string, username:string) {
    const collectionRef = collection(this.firestore, 'messages');
    return addDoc(collectionRef, {msg, from: this.currentUser.uid, sendAt: serverTimestamp(), name: username});
  }

  getChatMessages() {
    let users:any[] = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        const collectionRef = collection(this.firestore, 'messages');
        return collectionData(collectionRef, { idField: 'uid'}) as Observable<any[]>
      }),
      map(messages => {
        for(let m of messages) {
          if(m.from != null) {
            m.fromName = this.getUserForMsg(m.from, users)
            m.myMsg = this.currentUser.uid === m.from;
          }
        }
        console.log('all messages', messages);
        return messages;
      })
    );
  }

  getUsers() {
    const collRef = collection(this.firestore, 'users');
    return collectionData(collRef, { idField: 'uid'}) as Observable<any[]>;
  }

  getUserForMsg(msgFromId:string, users:any[]) {
    for(let usr of users) {
      if(usr.uid == msgFromId) {
        return usr.email;
      }
    }
    return 'Eliminado';
  }

  
}

import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, limit, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fs:Firestore) { }

  saveResults(juego:string, results:any) {
    const collRef = collection(this.fs, juego);
    return addDoc(collRef, results);
  }

  getResults(juego:string):Observable<any[]> {
    const collRef = collection(this.fs, juego);
    const q = query(collRef, orderBy('score', 'desc'), limit(5));
    return collectionData(q, { idField: 'uid'}) as Observable<any[]>;
  }

  addEncuesta(encuesta:any) {
    const collRef = collection(this.fs, 'encuestas');
    return addDoc(collRef, encuesta);
  }

  getEncuestas():Observable<any[]> {
    const collRef = collection(this.fs, 'encuestas');
    return collectionData(collRef, { idField: 'uid'}) as Observable<any[]>;
  }
}

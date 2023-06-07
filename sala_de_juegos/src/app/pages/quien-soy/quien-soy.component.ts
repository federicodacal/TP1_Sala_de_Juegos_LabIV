import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent {

  github?:any;
  loading:boolean = true;

  constructor(private http:HttpClient) {
    this.http.get('https://api.github.com/users/federicodacal').subscribe((res:any) => {
      this.github = res;
      console.info('github', res);

      this.loading = false;
    });
  }

}

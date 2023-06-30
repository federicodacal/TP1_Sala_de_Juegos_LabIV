import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }

  async getCountries() {
    try {
      const res:any = await fetch('https://restcountries.com/v3.1/all');
      const countries:any = await res.json();
      return countries;
    } 
    catch (err) {
      console.log('err countries', err);
    }
  }
}

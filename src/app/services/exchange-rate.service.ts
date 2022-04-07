import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExchangeRate } from 'src/app/interfaces/exchangeRate.interfaces'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private baseUrl : string = "http://127.0.0.1:5000";
  
  constructor(private http: HttpClient) { 

  }

  getByDay(date: string) : Observable<ExchangeRate[]>{
    const url = `${this.baseUrl}/exchange-rate/${date}`;
    return this.http.get<ExchangeRate[]>(url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExchangeRate } from 'src/app/interfaces/exchangeRate.interfaces'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  // private baseUrl : string = "http://192.168.1.155:5000";
  private baseUrl : string = "http://localhost:5000";
  
  constructor(private http: HttpClient) { 

  }

  getByDay(date: string, service: string) : Observable<ExchangeRate[]>{
    const url = `${this.baseUrl}/exchange-rate/${date}?service=${service}`;
    return this.http.get<ExchangeRate[]>(url);
  }

  
  getDiaryMinsByMonth(moth: string, service: string) : Observable<any[]>{
    const url = `${this.baseUrl}/mins-by-month/${moth}?service=${service}`;
    return this.http.get<any[]>(url);
  }

}

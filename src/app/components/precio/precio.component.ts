import { Component, Input, OnInit } from '@angular/core';
import { ExchangeRatePrecio } from 'src/app/interfaces/exchangeRate.interfaces';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: []
})
export class PrecioComponent  {

  @Input() color  : string = 'primary';
  @Input() titulo : string = '';
  @Input() precio : ExchangeRatePrecio = { fecha: '00/00/0000 00:00:00', valor: 0.00 , simbolo: "🟡"};

  getDivClass(){
    return `box m-2 has-background-${this.color}-light`
  }

  getSpanClass(){
    return `tag is-${this.color} mb-5`
  }

  getPFecha(){
    return `has-text-${this.color}`
  }
}

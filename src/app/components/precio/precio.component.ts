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
  @Input() precio : ExchangeRatePrecio[] = [];

  getDivClass(){
    return `box m-2 has-background-${this.color}-light`
  }

  getSpanClass(){
    return `title is-4 has-text-${this.color} mb-3`
  }

  getPFecha(){
    return `has-text-${this.color}`
  }

  getSpanRatio(){
    return `tag is-${this.color}`
  }

  showIconAlert(value : any, item : any){
    return value === item.valor ? '💡' : ''
  }
}

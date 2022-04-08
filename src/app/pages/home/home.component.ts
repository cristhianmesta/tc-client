import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

import { ExchangeRatePrecio } from 'src/app/interfaces/exchangeRate.interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  AfterContentInit {

  myDate  : string  = new Date().toLocaleDateString('en-CA');
  data    : any[]   = [];
  multi   : any[]   = [];

  actualizando : boolean = false;
  total: number = 0

  pc : ExchangeRatePrecio = { fecha: '-', valor: 0.00 , simbolo: "🟡"};
  pv : ExchangeRatePrecio = { fecha: '-', valor: 0.00 , simbolo: "🟡"};

  //view: [number, number] = [700, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Precio';
  timeline: boolean = true;

  colorScheme : any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private exchangeRateService : ExchangeRateService) { 
    this.list(this.myDate);
  }

  ngAfterContentInit(): void {
    setInterval( () => { this.list(this.myDate); }, 10000);
  }

  refresh(){
    this.pv = { fecha: '-', valor: 0.00 , simbolo: "🟡"};
    this.pc = { fecha: '-', valor: 0.00 , simbolo: "🟡"}
    this.list(this.myDate);
  }


  list(day : string) : void {
    this.exchangeRateService
            .getByDay(day)
            .subscribe( resp => {
                this.data = [];
                this.data.push(({
                  name: "Venta",
                  series: resp.map( x => ({
                      name: x.fecha,
                      value: x.pv
                  }))
                }));
                this.data.push(({
                  name: "Compra",
                  series: resp.map( x => ({
                      name: x.fecha,
                      value: x.pc
                  }))
                }));
                this.total = Object.keys(this.data[0].series).length;
                
                this.pv = { 
                  fecha: this.data[0].series[this.total-1].name,
                  valor: this.data[0].series[this.total-1].value,
                  simbolo: this.selectSimbol(this.data[0].series)
                }

                this.pc = { 
                  fecha: this.data[1].series[this.total-1].name,
                  valor: this.data[1].series[this.total-1].value,
                  simbolo: this.selectSimbol(this.data[1].series)
                }
                
                Object.assign(this, { multi: this.data });
            });
           
  }


  selectSimbol(collection: any){
    let simbolo = '🟡';
    if(collection[this.total-1].value>collection[this.total-2].value) simbolo = "🔴"
    if(collection[this.total-1].value<collection[this.total-2].value) simbolo = "🟢"
    return simbolo
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}

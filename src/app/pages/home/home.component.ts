import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

import { ExchangeRatePrecio, Rate } from 'src/app/interfaces/exchangeRate.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  AfterContentInit {

  myDate      : string      = new Date().toLocaleDateString('en-CA');
  data        : any[]       = [];
  multi       : any[]       = [];

  actualizando : boolean = false;
  total: number = 0

  pc : ExchangeRatePrecio = { fecha: '00/00/0000 00:00:00', valor: 0.00 , simbolo: "🟡"};
  pv : ExchangeRatePrecio = { fecha: '00/00/0000 00:00:00', valor: 0.00 , simbolo: "🟡"};

  //view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
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
    this.pv = { fecha: '0000-00-00 00:00:00', valor: 0.00 , simbolo: "🟡"};
    this.pc = { fecha: '0000-00-00 00:00:00', valor: 0.00 , simbolo: "🟡"}
    this.list(this.myDate);
  }


  list(day : string) : void {
    this.exchangeRateService
            .getByDay(day)
            .subscribe( resp => {
                this.data = [];
                if(resp.length>0){
                  this.data.push(({
                    name: "Venta",
                    series: resp.map( x => ({name: x.fecha, value: x.pv}))
                  }));
                  this.data.push(({
                    name: "Compra",
                    series: resp.map( x => ({name: x.fecha, value: x.pc}))
                  }));
                  this.total = Object.keys(this.data[0].series).length;
                  
                  this.pv = { 
                    fecha   : this.data[0].series[this.total-1].name,
                    valor   : this.data[0].series[this.total-1].value,
                    simbolo : this.selectSimbol(this.data[0].series),
                    rates   : this.populateRates(this.data[0].series)
                  }

                  this.pc = { 
                    fecha   : this.data[1].series[this.total-1].name,
                    valor   : this.data[1].series[this.total-1].value,
                    simbolo : this.selectSimbol(this.data[1].series),
                    rates   : this.populateRates(this.data[1].series)
                  }

                }
 
                Object.assign(this, { multi: this.data });
            });
           
  }

  selectSimbol(collection: any){
    let simbolo = '- 🟡';
    if(collection[this.total-1].value>collection[this.total-2].value) simbolo = "↗ 🔴"
    if(collection[this.total-1].value<collection[this.total-2].value) simbolo = "↘ 🟢"
    return simbolo
  }

  populateRates(serie : any){
    let promedio =  serie.reduce((a : any, b: any) => a + b.value, 0)/serie.length;
    let max = Math.max(...serie.map((item : any) => item.value ));
    let min = Math.min(...serie.map((item : any) => item.value ));
    return { avg: promedio,  max: max, min: min };
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

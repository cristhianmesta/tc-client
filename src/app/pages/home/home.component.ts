import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

import { ExchangeRatePrecio, Rate } from 'src/app/interfaces/exchangeRate.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  AfterContentInit {

  myDate         : string      = new Date().toLocaleDateString('en-CA');
  data_compra        : any[]       = [];
  data_venta         : any[]       = [];
  multi_compra       : any[]       = [];
  multi_venta        : any[]       = [];

  actualizando : boolean = false;
  total: number = 0

  pc : ExchangeRatePrecio[] = [];
  pv : ExchangeRatePrecio[] = [];

  pc_temp : ExchangeRatePrecio[] = [];
  pv_temp : ExchangeRatePrecio[] = [];

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
    domain: ['#26436C', '#FFB73A', '#76D8FF']
  };

  constructor(private exchangeRateService : ExchangeRateService) { 
    this.listAll();
  }

  ngAfterContentInit(): void {
    setInterval( () => { this.listAll(); }, 10000);
  }

  refresh(){
    this.pv = [];
    this.pc = []; // { fecha: '0000-00-00 00:00:00', valor: 0.00 , simbolo: "🟡"}
    this.listAll();
  }

  listAll(){
    this.list(this.myDate, "REXTIE", "#76D8FF");
    this.list(this.myDate, "TKAMBIO", "#FFB73A");
    this.list(this.myDate, "KAMBISTA","#26436C");    
  }

  list(day : string, service : string, color: string) : void {
    this.exchangeRateService
            .getByDay(day, service)
            .subscribe( resp => {
                if(resp.length>0){

                  if(this.data_venta.length === 3){
                    this.pv_temp = [];
                    this.pc_temp = [];
                    this.data_venta = [];
                    this.data_compra = [];
                  }
                  
                  this.data_venta.push(({
                    name: `VENTA ${service}`,
                    series: resp.map( x => ({name: new Date(x.fecha) , value: x.pv})),
                    color: color
                  }));
                  
                  this.data_compra.push(({
                    name: `COMPRA ${service}`,
                    series: resp.map( x => ({name: x.fecha, value: x.pc}))
                  }));

                }

                if(this.data_venta.length === 3){


                  this.data_venta.forEach( (element : any) => {
                    this.pv_temp.push({ 
                      fecha   : element.series[Object.keys(element.series).length-1].name,
                      valor   : element.series[Object.keys(element.series).length-1].value,
                      simbolo : this.selectSimbol(element.series),
                      rates   : this.populateRates(element.series),
                      service : element.name.split(" ")[1],
                    });
                  });

                  this.data_compra.forEach( (element : any) => {
                    this.pc_temp.push({ 
                      fecha   : element.series[Object.keys(element.series).length-1].name,
                      valor   : element.series[Object.keys(element.series).length-1].value,
                      simbolo : this.selectSimbol(element.series),
                      rates   : this.populateRates(element.series),
                      service : element.name.split(" ")[1],
                    });
                  });

                  this.pv = this.pv_temp.sort((a, b) => a.valor - b.valor);
                  this.pc = this.pc_temp.sort((a, b) => b.valor - a.valor);


                  this.colorScheme.domain = [this.data_venta[0].color, this.data_venta[1].color, this.data_venta[2].color];
                  Object.assign(this, { multi_compra: [...this.data_compra] });
                  Object.assign(this, { multi_venta: [...this.data_venta] });
                }

            });
           
  }

  selectSimbol(collection: any){
    let simbolo = '- 🟡';
    let total = Object.keys(collection).length;
    if(collection[total-1].value>collection[total-2].value) simbolo = "↗ 🔴"
    if(collection[total-1].value<collection[total-2].value) simbolo = "↘ 🟢"
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

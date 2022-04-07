import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExchangeRatePrecio } from 'src/app/interfaces/exchangeRate.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {

  data: any[] = [];
  multi: any[] = [];

  actualizando : boolean = false;
  total: number = 0

  pc : ExchangeRatePrecio = { fecha: '', valor: 0.00};
  pv : ExchangeRatePrecio = { fecha: '', valor: 0.00};


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

  myDate = new Date();

  constructor(private exchangeRateService : ExchangeRateService) { 
    this.list('2022-04-07');
  }

  ngAfterContentInit(): void {
    setInterval( () => {
      this.list('2022-04-07');
    }, 10000);
  }


  ngOnInit(): void {
    
  }

  list(day : string) : void {
    this.exchangeRateService
            .getByDay(day)
            .subscribe( resp => {
                this.data = [];
                this.data.push(({
                  name: "Venta",
                  series: resp.map( x => ({
                      name: new Date(x.fecha).toISOString(),
                      value: x.pv
                  }))
                }));
                this.data.push(({
                  name: "Compra",
                  series: resp.map( x => ({
                      name: new Date(x.fecha).toISOString(),
                      value: x.pc
                  }))
                }));
                this.total = Object.keys(this.data[0].series).length;
                
                this.pv = { 
                  fecha: this.data[0].series[this.total-1].name,
                  valor: this.data[0].series[this.total-1].value
                }

                this.pc = { 
                  fecha: this.data[1].series[this.total-1].name,
                  valor: this.data[1].series[this.total-1].value
                }
                Object.assign(this, { multi: this.data });
            });
           
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

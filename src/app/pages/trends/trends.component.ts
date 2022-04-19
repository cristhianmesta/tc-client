import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  
  table : any[] = [];
  data : any[] = [];
  
  constructor(private exchangeRateService : ExchangeRateService) { }

  ngOnInit(): void {
    this.getData('04-2022');
  }

  getData(month : string) : void {
    this.exchangeRateService
            .getDiaryMinsByMonth(month)
            .subscribe( resp => {
              this.data = resp;
              this.createTable('04-2022');
            });
  }

  createTable(month : string) : void {
    this.table = Array(30)
                    .fill({})
                    .map( (_,index) => ({ 
                        date  : new Date(2022,3,index+1),
                        day   : index+1,
                        at_8  : this.findValue(index+1,8), 
                        at_9  : this.findValue(index+1,9), 
                        at_10 : this.findValue(index+1,10), 
                        at_11 : this.findValue(index+1,11), 
                        at_12 : this.findValue(index+1,12), 
                        at_13 : this.findValue(index+1,13), 
                        at_14 : this.findValue(index+1,14), 
                        at_15 : this.findValue(index+1,15), 
                        at_16 : this.findValue(index+1,16), 
                        at_17 : this.findValue(index+1,17), 
                        at_18 : this.findValue(index+1,18), 
                      }));
  }

  findValue(day: number, hour: number) : number{
    const value = this.data.find( x => x.day_of_the_month === day);
    return  value===undefined? undefined: value['at_'+hour];
  }

  findColor(values: any, value: number) : string{
    let className = '';
    if(value===undefined) return className;

    let valuesOrdered = Array(11)
                          .fill(0)
                          .map( (_, index) => {
                            let price = values['at_'+(index+8).toString()];
                            return price!==undefined? price : 0 ;
                          })
                          .sort( (a,b) => a-b)
                          .filter( x => x>0)[0];
    if(valuesOrdered===undefined) return className;

    if(value===valuesOrdered) className = 'has-text-link-dark has-background-link-light has-text-weight-bold';
  
    return className;
  }

}

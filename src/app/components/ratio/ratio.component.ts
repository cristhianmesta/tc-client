import { Component, Input } from '@angular/core';
import { Rate } from 'src/app/interfaces/exchangeRate.interfaces';

@Component({
  selector: 'app-ratio',
  templateUrl: './ratio.component.html',
  styleUrls: []
})

export class RatioComponent {

  @Input() rate : any;


}

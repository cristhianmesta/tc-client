import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { PrecioComponent } from './components/precio/precio.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrendsComponent,
    PrecioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-*' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

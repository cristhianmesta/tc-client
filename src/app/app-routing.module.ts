import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TrendsComponent } from './pages/trends/trends.component';

const routes: Routes = [
  { path: '', redirectTo: 'evolucion', pathMatch: 'full' },
  { path: 'evolucion', component: HomeComponent },
  { path: 'minimos', component: TrendsComponent },
  { path: '**', redirectTo: 'evolucion', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

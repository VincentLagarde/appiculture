import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListeRuchersComponent } from './liste-ruchers/liste-ruchers.component';
import { VisiteRucherComponent } from './visite-rucher/visite-rucher.component';
import { CarteRuchersComponent } from './carte-ruchers/carte-ruchers.component';
import { SharedModule } from 'src/app/modules/shared.module';


const routes: Routes = [
  { path: '', redirectTo: 'liste-ruchers'},
  { path: 'liste-ruchers', component: ListeRuchersComponent},
  { path: 'carte-ruchers', component: CarteRuchersComponent},
  { path: 'visite-rucher', component: VisiteRucherComponent},
  { path : '**', redirectTo : 'liste-ruchers'}
];

@NgModule({
  declarations: [
    ListeRuchersComponent,
    CarteRuchersComponent,
    VisiteRucherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FrontOfficeModule { }

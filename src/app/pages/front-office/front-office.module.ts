import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListeRuchersComponent } from './liste-ruchers/liste-ruchers.component';
import { VisiteRucherComponent } from './visite-rucher/visite-rucher.component';
import { CarteRuchersComponent } from './carte-ruchers/carte-ruchers.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { CreerVisiteComponent } from './creer-visite/creer-visite.component';
import { DetailsVisiteComponent } from './details-visite/details-visite.component';


const routes: Routes = [
  { path: '', redirectTo: 'liste-ruchers', pathMatch : 'full'},
  { path: 'liste-ruchers', component: ListeRuchersComponent},
  { path: 'carte-ruchers', component: CarteRuchersComponent},
  { path: 'visite-rucher/:id', component: VisiteRucherComponent},
  { path: 'details-visite/:id/:date', component: DetailsVisiteComponent},
  { path: 'creer-visite/:id', component: CreerVisiteComponent},
  { path : '**', redirectTo : 'liste-ruchers'}
];

@NgModule({
  declarations: [
    ListeRuchersComponent,
    CarteRuchersComponent,
    VisiteRucherComponent,
    CreerVisiteComponent,
    DetailsVisiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FrontOfficeModule { }

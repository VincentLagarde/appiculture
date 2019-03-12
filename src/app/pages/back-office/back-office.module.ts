import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RuchesRuchersComponent } from './ruches-ruchers/ruches-ruchers.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'configuration'},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'ruches-ruchers', component: RuchesRuchersComponent},
  { path : '**', redirectTo : 'configuration'}
];

@NgModule({
  declarations: [ConfigurationComponent, RuchesRuchersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class BackOfficeModule { }

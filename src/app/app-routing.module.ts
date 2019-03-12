import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', redirectTo : 'front', pathMatch : 'full' },
  { path: 'back', loadChildren: './pages/back-office/back-office.module#BackOfficeModule'},
  { path: 'front', loadChildren: './pages/front-office/front-office.module#FrontOfficeModule'},
  { path : '**', redirectTo : 'front'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

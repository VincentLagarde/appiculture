import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { FrontOfficeModule } from './pages/front-office/front-office.module';
import { BackOfficeModule } from './pages/back-office/back-office.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    //Permet d'avoir les dates pickers en français
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

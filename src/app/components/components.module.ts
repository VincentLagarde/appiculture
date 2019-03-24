import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.module';
import { FrequencePositionRucherComponent } from './frequence-position-rucher/frequence-position-rucher.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FrequencePositionRucherComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
	exports: [
    FrequencePositionRucherComponent
	]
})
export class ComponentsModule { }

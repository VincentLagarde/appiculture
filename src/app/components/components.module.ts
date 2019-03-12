import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.module';

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
	exports: [
	]
})
export class ComponentsModule { }

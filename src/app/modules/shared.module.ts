import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ComponentsModule } from '../components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    FlexLayoutModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }

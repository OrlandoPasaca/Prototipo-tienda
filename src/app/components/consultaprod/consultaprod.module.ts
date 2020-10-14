import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaprodComponent } from './consultaprod.component';
import {ConsultaProdRouting} from './consultaprod-routing.module'
import {ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [ConsultaprodComponent],
  imports: [
    CommonModule,
    ConsultaProdRouting,
    ReactiveFormsModule
  ]
})
export class ConsultaprodModule { }

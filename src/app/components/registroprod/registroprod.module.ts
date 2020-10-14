import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroprodComponent } from './registroprod.component';
import { RegistroprodRoutingModule } from './registroprod-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { GananciaDirective } from 'src/app/directives/ganancia.directive';



@NgModule({
  declarations: [RegistroprodComponent,
  GananciaDirective
  ],
  imports: [
    CommonModule,
    RegistroprodRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistroprodModule { }

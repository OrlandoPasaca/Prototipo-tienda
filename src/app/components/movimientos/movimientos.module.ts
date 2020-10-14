import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientosComponent } from './movimientos.component';
import { MovimientosRoutingModule } from './movimientos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MovimientosComponent],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    ReactiveFormsModule
  ]
})
export class MovimientosModule { }

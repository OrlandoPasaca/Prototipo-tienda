import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaComponent } from './caja.component';
import { CajaRoutingModule } from './caja-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CajaComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CajaModule { }

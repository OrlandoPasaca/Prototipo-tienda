import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IngresarProductoComponent } from './components/ingresar-producto/ingresar-producto.component';
import { AjusteStockComponent } from './components/ajuste-stock/ajuste-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IngresarProductoComponent,
    AjusteStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

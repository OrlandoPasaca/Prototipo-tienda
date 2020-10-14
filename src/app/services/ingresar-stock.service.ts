import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IngresoProductoModel } from '../modelo/ingreso_stock.model';

@Injectable({
  providedIn: 'root'
})
export class IngresarStockService {

  constructor(private _http:HttpClient) {}
  ingresarStock(producto)
  {
    return this._http.put("https://www.hiddensoft.net/pruebasconsultas/ingreso_stock.php",{producto:producto})
  }
}

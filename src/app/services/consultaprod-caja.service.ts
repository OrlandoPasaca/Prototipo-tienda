import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaprodCajaService {

  constructor(private http:HttpClient) { }
  buscarProducto(codigo_barras:number,codigo_producto:number)
  {
    const cod_producto=codigo_producto;
    const cod_barras=codigo_barras;
    return this.http.get(`https://hiddensoft.net/pruebasconsultas/consultaprod-caja.php/?codigo_producto=${cod_producto}&codigo_barras=${cod_barras}`);
  }
}

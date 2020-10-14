import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagarService {

  constructor(private http:HttpClient) { }
  
  pagar(carrito,n_factura,comentario)
  {
     
    return this.http.put("https://www.hiddensoft.net/pruebasconsultas/pagar.php",{carrito:carrito,n_factura:n_factura,comentario:comentario})
  }
}

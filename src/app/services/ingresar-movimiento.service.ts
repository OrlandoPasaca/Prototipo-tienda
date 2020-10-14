import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresarMovimientoService {

  constructor(private http:HttpClient) {

   }
   ingresarMovimiento(carrito,n_factura,comentario,costo,tipo)
   {
    
     console.log({carrito:carrito,n_factura:n_factura,comentario:comentario,costo:costo,tipo:tipo});
     return this.http.post("https://www.hiddensoft.net/pruebasconsultas/ingresar_movimiento.php",
            {carrito:carrito,n_factura:n_factura,comentario:comentario,costo:costo,tipo:tipo},
            {headers:{"Content-Type":"application/json"}});
   }

}

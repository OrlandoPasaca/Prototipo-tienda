import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegistroModel } from '../modelo/registro_prod.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroProdService {

  constructor(private http:HttpClient) {
   }
   registrarProducto(registroModel:RegistroModel)
   {
     const params=new HttpParams()
     .set("cod_barras",""+registroModel.getcodigo_barras)
     .set("cod_producto",""+registroModel.getcodigo_producto)
     .set("nombre_prod",""+registroModel.getnombre_producto)
     .set("precio_compra",""+registroModel.getPrecio_Compra)
     .set("precio_venta",""+registroModel.getprecio_unitario)
     .set("ganancia",""+registroModel.getGanancia)
     .set("stock",""+registroModel.getcantidad)
     .set("estado",""+RegistroModel.estado);
     console.log(registroModel.getcantidad); 
     console.log(params);
     return this.http.post("https://www.hiddensoft.net/pruebasconsultas/registro_prod.php",params);
   }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaProdModel } from '../modelo/consultaprod.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaprodService {

  constructor(private http:HttpClient) { }
  consultarproducto(consultamodel:ConsultaProdModel)
  {
    const codigo_barras=encodeURIComponent(consultamodel.getCodigoBarras);
    const codigo_producto=encodeURIComponent(consultamodel.getCodigoProducto);
    const nombre_prod=encodeURIComponent(consultamodel.getNombreProd);
    return this.http.get(`https://hiddensoft.net/pruebasconsultas/consultaprod.php/?nombre_prod=${nombre_prod}&codigo_producto=${codigo_producto}&codigo_barras=${codigo_barras}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReporteVentasModel } from '../modelo/reporte-ventas.model';

@Injectable({
  providedIn: 'root',
})
export class VentasService {

  constructor(private http:HttpClient) 
  {

  }
  obtenerReporte(reportemodel:ReporteVentasModel)
  {
    let codigo;
    if(reportemodel.getcodigo==null)
    {
    codigo="todo";
    }
    else
    {
    codigo=reportemodel.getcodigo;
    }
   return this.http.get(`https://www.hiddensoft.net/pruebasconsultas/reporte-ventas.php/?codigo=${codigo}&desde=${reportemodel.getdesde}&hasta=${reportemodel.gethasta}`)
  }
}

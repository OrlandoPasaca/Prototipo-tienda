import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerarCodigoService {

  constructor(private http:HttpClient) { }

  obtenerCodigoGenerado()
  {
    return this.http.get("https://www.hiddensoft.net/pruebasconsultas/generarcodigo.php");
  }

}

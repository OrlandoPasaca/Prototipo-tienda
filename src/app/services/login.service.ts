import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { UsuarioModel } from '../modelo/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  validarUsuario(usuariomodel:UsuarioModel)
  {
    const users=new HttpParams()
    .set("usuario",usuariomodel.usuario)
    .set("contrasena",usuariomodel.contrasena);
    console.log(users);
    return this.http.post(`https:/www.hiddensoft.net/pruebasconsultas/login.php`,users);
  }
  usuarioPermitido():boolean
  {
    return sessionStorage.getItem("usuario")?true:false;
  }
}

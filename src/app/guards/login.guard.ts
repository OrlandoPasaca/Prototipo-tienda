import { Injectable } from '@angular/core';
import {CanLoad,Router} from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private _loginService:LoginService,private router:Router)
  {

  }
  canLoad(): boolean {

     if(this._loginService.usuarioPermitido())
     {
       return true;
     }
     else
     {
      this.router.navigate(["/login"]);
       return false;
     }
  }
  
}

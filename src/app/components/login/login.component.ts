import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/modelo/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma:FormGroup;
  usuario=sessionStorage;
  usuariomodel:UsuarioModel;
  mostrarform:boolean=true;
  mostrarpass:boolean=false;
  constructor(private fb:FormBuilder,private login:LoginService,private router:Router) {
    if(login.usuarioPermitido()) 
    {

    this.mostrarform=false;
    this.router.navigate(["/home"]);
    }
    this.crearformulario();
    this.onValueChangesForm();
   }

  ngOnInit(): void {
  }
  crearformulario()
  {
    this.forma=this.fb.group(
      {
        usuario:["",[Validators.required,Validators.pattern("^[a-zA-Z0-9]([a-zA-Z0-9])*")]],
        contrasena:["",[Validators.required,Validators.pattern("^[a-zA-Z0-9]([a-zA-Z0-9])*")]]
      }
    )
  }
  onSubmit()
  {
    Swal.fire({
      title: 'Ingresando',
      text: 'Espere por favor.....',
      icon: 'info',
      allowOutsideClick:false
    })
    Swal.showLoading();
    if(this.forma.valid)
    {
          this.login.validarUsuario(this.usuariomodel).subscribe((res:any)=>
          {
            
            if(this.usuariomodel.usuario==res.usuario)
            {
              Swal.close();
              sessionStorage.setItem("usuario",this.usuariomodel.usuario);
              this.router.navigate(["/home"]);
            }
            else
            {
              Swal.fire({
                title: 'Error al iniciar sesion',
                text: 'Usuario o contraseña erronea',
                icon: 'error',
                allowOutsideClick:false,
                showConfirmButton:true
              })
            }
          });
    }
    else
    {
      Swal.fire({
        title: 'Error',
        text: 'Revise los campos invalidos',
        icon: 'error',
        allowOutsideClick:false,
        showConfirmButton:true
      })
      console.log(this.forma);
    }

  }
  onValueChangesForm()
  {
    this.forma.valueChanges.subscribe(res=>
      {
        this.usuariomodel=res
        console.log(this.usuariomodel);
      });
  }
  cambiarestado()
  {
    this.mostrarpass=!this.mostrarpass;
  }
  get usuarioInvalido()
  {
    return this.forma.get("usuario").invalid && this.forma.get("usuario").touched;
  }
  get contrasenaInvalida()
  {
    return this.forma.get("contrasena").invalid && this.forma.get("contrasena").touched;
  }
  get usuarioConCaracteres()
  {
    return this.forma.get("usuario").errors&&this.forma.get("usuario").errors.pattern && this.forma.get("usuario").touched;
  }
  get usuarioVacio()
  {
    return this.forma.get("usuario").errors&&this.forma.get("usuario").errors.required && this.forma.get("usuario").touched;
  }
  get contrasenaConCaracteres()
  {
    return this.forma.get("contrasena").errors&&this.forma.get("contrasena").errors.pattern && this.forma.get("contrasena").touched;
  }
  get contrasenaVacio()
  {
    return this.forma.get("contrasena").errors&&this.forma.get("contrasena").errors.required && this.forma.get("contrasena").touched;
  }



}

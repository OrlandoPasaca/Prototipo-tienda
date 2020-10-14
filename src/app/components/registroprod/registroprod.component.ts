import { Component, OnInit,Output, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroModel } from 'src/app/modelo/registro_prod.model';
import { RegistroProdService } from 'src/app/services/registro-prod.service';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import { GenerarCodigoService } from 'src/app/services/generar-codigo.service';
import { IngresarMovimientoService } from 'src/app/services/ingresar-movimiento.service';

@Component({
  selector: 'app-registroprod',
  templateUrl: './registroprod.component.html',
  styleUrls: ['./registroprod.component.css']
})
export class RegistroprodComponent implements OnInit {

  forma:FormGroup;
  carrito=[];
  producto;
  private static readonly comentario="";
  n_factura;
  pago_total;
  registroModel:RegistroModel=new RegistroModel;
  private static readonly tipo="registro";

  constructor(private ingresarmov:IngresarMovimientoService,private fb:FormBuilder,private registroService:RegistroProdService, private generarCodigo_Service:GenerarCodigoService)
   {
    this.crearFormulario();
    this.OnValueChanges();
   }

  ngOnInit(): void {}
   private async crearFormulario()
  {
    this.forma=this.fb.group(
      {
        cod_barras:["",[Validators.required,Validators.pattern(/[0-9]*/)]],
        cod_producto:[this.registroModel.getcodigo_producto,[Validators.required,Validators.pattern("[0-9]*")]],
        nombre_prod:[this.registroModel.getnombre_producto,
                    [Validators.required,Validators.pattern(/^[a-zA-Z0-9]*([a-zA-Z0-9]\s?)*[a-zA-Z0-9]$/)]],
        precio_compra:["",[Validators.required,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)]],
        precio_venta:["",[Validators.required,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)]],
        ganancia:[this.registroModel.getGanancia,[Validators.required]],
        stock:["",[Validators.required,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)]],
        estado:[RegistroModel.estado,[Validators.required]]
      }
    );
    await this.obtenerCodigo();
  }
  
  onSubmit()
  {
    
    if(this.forma.valid)
    {
        Swal.fire(
        {
          title:"Registrando",
          text:"Espere por favor",
          icon:"info",
          allowOutsideClick:false
        });
        Swal.showLoading();
      this.registroService.registrarProducto(this.registroModel).subscribe((res:any)=>
        {
           
          this.enviar_validar_registro(res);
        }
        );
    }
    else
    {
      Swal.fire(
        {
          title:"Error",
          text:"Ingrese informacion valida",
          icon:"error",
          allowOutsideClick:false
        });
        (<any>Object).values(this.forma.controls).forEach(control => {
          control.markAsTouched();
        });
      
    }
  }
  
  /* onChange(event)
  {
    this.forma.get("ganancia").setValue(event)
  } */
  OnValueChanges()
  {
    this.forma.valueChanges.subscribe(res=>
      {
      const precioCompra = this.forma.get('precio_compra').value;
      const precioVenta = this.forma.get('precio_venta').value;
      const ganancia = precioVenta - precioCompra;
      this.forma.get("ganancia").setValue(ganancia,{emitEvent:false})
      this.registroModel.setcodigo_barras=res.cod_barras;
      this.registroModel.setcodigo_producto=res.cod_producto;
      this.registroModel.setnombre_producto=res.nombre_prod;
      this.registroModel.setPrecio_Compra=res.precio_compra;
      this.registroModel.setprecio_unitario=res.precio_venta;
      this.registroModel.getGanancia;
      this.registroModel.setcantidad=res.stock;
      console.log(this.registroModel)
      })
  }
  stop(event)
  {
    if(event.keyCode==13)
    {
    event.stopPropagation();
    event.preventDefault();
    }
  }
 async resetear_form()
  {
    this.forma.reset();
    this.carrito=[];
    this.producto=null;
    this.n_factura=null;
    this.pago_total=null;
    await this.obtenerCodigo();
    this.forma.get("estado").setValue(RegistroModel.estado);
  }

  obtenerCodigo()
  {
    this.generarCodigo_Service.obtenerCodigoGenerado().subscribe((res:any)=>
      {
        this.forma.get("cod_producto").setValue(res);
      })
  }
  enviar_validar_registro(res)
  {
    if(res.errorInfo)
            {
          Swal.fire(
            {
              title:"Error",
              text:`Error: ${res.errorInfo[2]}`,
              icon:"error",
              allowOutsideClick:false
            });
        
            }
            else
          {  
            this.producto={
              ...this.registroModel
            }
            this.producto.codigo_producto=res.cod_producto;
            this.carrito.push(this.producto);
            console.log(this.carrito);
            this.n_factura=uuidv4();
            this.ingresarmov.ingresarMovimiento(this.carrito,this.n_factura,RegistroprodComponent.comentario,this.producto.total,RegistroprodComponent.tipo).subscribe();
          Swal.fire(
            {
              
              title:"Se registro correctamente",
              html:`<pre>codigo barras: ${res.cod_barras}
codigo producto: ${res.cod_producto}
nombre producto: ${res.nombre_prod}
precio compra: ${res.precio_compra}
precio venta: ${res.precio_venta}
ganancia: ${res.ganancia}
stock: ${res.stock}
estado: ${res.estado}</pre>`,
              icon:"success",
              allowOutsideClick:false
            });
            this.resetear_form();
            console.log(this.registroModel);
            document.getElementsByTagName("input")[0].focus();
          }
  }
  codigoBarrasIncorrecto()
  {
    return this.forma.get("cod_barras").invalid && this.forma.get("cod_barras").touched;
  }
  nombreProdIncorrecto()
  {
    return this.forma.get("nombre_prod").invalid && this.forma.get("nombre_prod").touched;
  }
  precioCompraIncorrecto()
  {
    return this.forma.get("precio_compra").invalid && this.forma.get("precio_compra").touched;
  }
  precioVentaIncorrecto()
  {
    return this.forma.get("precio_venta").invalid && this.forma.get("precio_venta").touched;
  }
  stockIncorrecto()
  {
    return this.forma.get("stock").invalid && this.forma.get("stock").touched;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConsultaprodCajaService } from 'src/app/services/consultaprod-caja.service';
import { ConsultaProdCajaModel } from 'src/app/modelo/consultaProdCaja.model';
import { PagarService } from 'src/app/services/pagar.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import {debounceTime} from 'rxjs/operators'
import { IngresarMovimientoService } from 'src/app/services/ingresar-movimiento.service';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {

  forma:FormGroup;
  formaCarrito:FormGroup;
  productomodel:ConsultaProdCajaModel;
  mostrarEdit=[];
  carrito=[];
  comentario="";
  n_factura;
  pago_total;
  private static readonly tipo="venta";
  constructor(private fb2:FormBuilder,private fb:FormBuilder,
    private _consultaprod:ConsultaprodCajaService,private _pagarService:PagarService,
    private _ingresarmovService:IngresarMovimientoService) { 
    this.pago_total=0;
    this.productomodel=new ConsultaProdCajaModel();
    this.crearFormulario();
    this.crearFormCarrito();
    this.onValueChanges();
    this.onValueChangesCarrito();
  }

  ngOnInit(): void {
  }
  crearFormCarrito()
  {
    this.formaCarrito=this.fb2.group(
      {
        carrito:this.fb2.array([]),
        comentario:[""]
      }
    )
  }
  crearFormulario()
  {
    this.forma=this.fb.group(
      {
        codigo_barras:["",[Validators.pattern(/^[0-9]*/),Validators.required]],
        codigo_producto:["",[Validators.pattern(/^[0-9]*/),Validators.required]],
        nombre_producto:["",Validators.required],
        precio_unitario:["",[Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/),Validators.required]],
        cantidad:["",[Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/),Validators.required]],
        total:["",[Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/),Validators.required]]
      }
    )
  }
  disabledEnter(event)
  {
    
    if(event.keyCode==13)
    {
      event.stopPropagation();
      event.preventDefault();
    }
  }
  buscarProductoporBarras()
  {
    this._consultaprod.buscarProducto
    (this.productomodel.getCodigoBarras,null)
    .subscribe((res:any)=>
      {
        this.forma.get("codigo_producto").setValue(res.codigo_producto,{emitEvent:false});
        this.productomodel.setCodigoProducto=this.forma.get("codigo_producto").value;
        this.forma.get("nombre_producto").setValue(res.nombre_producto);
        this.forma.get("precio_unitario").setValue(res.precio_venta);
        
      })
  }
  async buscarProductoporCodigo()
  {
    await this._consultaprod.buscarProducto
    (null,this.productomodel.getCodigoProducto)
    .toPromise()
    .then((res:any)=>
      {
        console.log(res);
        this.forma.get("codigo_barras").setValue(res.codigo_barras,{emitEvent:false});
        this.productomodel.setCodigoBarras=this.forma.get("codigo_barras").value;
        this.forma.get("nombre_producto").setValue(res.nombre_producto);
        this.forma.get("precio_unitario").setValue(res.precio_venta);
        
      })
  }
  onSubmit()
  {
    
    if(this.forma.valid)
    {
    this.pago_total=this.pago_total+this.productomodel.getTotal;
    
    this.carrito.push(this.productomodel);
    console.log(this.productomodel.getCantidad);
    (this.formaCarrito.get("carrito") as FormArray).push(this.fb2.control(this.productomodel.getCantidad,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)));
    this.mostrarEdit.push({mostrar:false})
    this.productomodel=new ConsultaProdCajaModel();  
    this.forma.reset();
    document.getElementsByTagName("input")[0].focus();
    }
    else
    {
      Object.values(this.forma.controls).forEach(control=>
        {
          control.markAsTouched();
        })
    }
  }
  onValueChanges()
  {
    this.forma.get("codigo_barras").valueChanges
    .pipe(debounceTime(500))
    .subscribe(res=>
      {
        this.productomodel.setCodigoBarras=res;
        this.productomodel.setCodigoProducto=this.forma.get("codigo_producto").value;
        this.buscarProductoporBarras();
        console.log(res);
        
      });
    
      this.forma.get("codigo_producto").valueChanges
      .pipe(debounceTime(500))
      .subscribe(res=>
        {
          this.productomodel.setCodigoProducto=res;
          this.productomodel.setCodigoBarras=this.forma.get("codigo_barras").value;
          this.buscarProductoporCodigo();
          
        });

    this.forma.valueChanges.subscribe(res=>
        {
          
          this.productomodel.setNombreProducto=res.nombre_producto;
          this.productomodel.setPrecioUnitario=res.precio_unitario;
          this.productomodel.setCantidad=res.cantidad;
          const precio_venta=res.precio_unitario;
          const cantidad=res.cantidad;
          this.forma.get("total").setValue(cantidad*precio_venta,{emitEvent:false});
          this.productomodel.setTotal=this.forma.get("total").value;
          
        });
  }
  onValueChangesCarrito()
  {
    this.formaCarrito.valueChanges.subscribe(res=>
      {
        this.comentario=res.comentario;
        for(let x=0;x<res.carrito.length;x++)
        {
          this.carrito[x].cantidad=res.carrito[x];
        }
        console.log(res)
      });
  }
  editarcantidad(i)
  {
    this.mostrarEdit[i].mostrar=true;
  }
  cambiarcantidad(i)
  {
    this.mostrarEdit[i].mostrar=false;
    this.pago_total=0;
    this.carrito[i].total=this.carrito[i].cantidad*this.carrito[i].precio_unitario;
    for(let producto of this.carrito)
    {
        this.pago_total=this.pago_total+producto.total;
    }
  }
  clickPago()
  {
    
    this.n_factura=uuidv4();
    
    if(this.formaCarrito.valid)
    {
    this.alertinfo("Realizando Pago",false,"info","Espere por favor")
    Swal.showLoading();

    this._pagarService.pagar(this.carrito,this.n_factura,this.comentario)
    .subscribe((res:any)=>
      {
        console.log(this.n_factura);
        if(res.mensaje)
        {
          this._ingresarmovService.ingresarMovimiento(this.carrito,this.n_factura,this.comentario,this.pago_total,CajaComponent.tipo)
          .subscribe((res2:any)=>
          {
          console.log(res2);
          this.alertinfo("Pago Registrado",false,"success",`Se registro con el siguiente identificador: 
          ${this.n_factura}`);
          document.getElementsByTagName("input")[0].focus();
          this.forma.reset();
          this.n_factura=null;
          this.limpiar();
          
          }) 
        }
      }
      );
    }
    else
    {
      this.alertinfo("Error al realizar Pago",false,"error","Verique el voucher electronico")
    }
     
  }
  alertinfo(title:string,allowOutsideClick:boolean,icon:SweetAlertIcon,text?:string)
  {
    Swal.fire(
      {
        title:title,
        text:text,
        icon:icon,
        allowOutsideClick:allowOutsideClick
        
      }
    );
  }
  campoInvalido(input)
  {
    return input.invalid && input.touched;
  }
  borrarProducto(i)
  {
    this.carrito.splice(i,1);
    (this.formaCarrito.get("carrito")as FormArray).removeAt(i);
    this.pago_total=0;
    for(let producto of this.carrito)
    {
        this.pago_total=this.pago_total+producto.total;
    }
  }
  limpiar()
  {
    this.formaCarrito.reset();
    this.comentario="";
    for(let x=0;x<this.carrito.length;x++)
    {
      (this.formaCarrito.get("carrito")as FormArray).removeAt(x);
    }
    this.carrito=[];
    this.mostrarEdit=[];
    this.pago_total=0;
    
  }
}

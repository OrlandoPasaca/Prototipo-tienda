import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { IngresoProductoModel } from 'src/app/modelo/ingreso_stock.model';
import { ConsultaprodCajaService } from 'src/app/services/consultaprod-caja.service';
import {v4 as uuidv4} from 'uuid';
import { IngresarStockService } from 'src/app/services/ingresar-stock.service';
import { IngresarMovimientoService } from 'src/app/services/ingresar-movimiento.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Component({
  selector: 'app-ingresar-producto',
  templateUrl: './ingresar-producto.component.html',
  styleUrls: ['./ingresar-producto.component.css']
})
export class IngresarProductoComponent implements OnInit {

  forma:FormGroup;
  ingresomodel:IngresoProductoModel;
  private static readonly tipo="ingreso";
  private static readonly comentario="";
  n_factura:string;
  costo:number;
  constructor(private fb:FormBuilder,
              private _consultaprod:ConsultaprodCajaService,
              private _ingresoService:IngresarStockService,
              private _ingresomov:IngresarMovimientoService) 
  {
    this.ingresomodel=new IngresoProductoModel();
    this.crearFormulario();
    this.onValueChanges();
  }

  ngOnInit(): void {

  }
  crearFormulario()
  {
    this.forma=this.fb.group(
      {
        codigo_barras:[this.ingresomodel.getcodigo_barras,[Validators.required,Validators.pattern(/^[0-9]*[0-9]$/)]],
        nombre_producto:[this.ingresomodel.getnombre_producto,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*([a-zA-Z0-9\.\,]\s?)*[a-zA-Z0-9]$/)]],
        precio_compra:[this.ingresomodel.getPrecio_Compra,[Validators.required,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)]],
        precio_venta:[this.ingresomodel.getprecio_unitario,[Validators.required,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)]],
        ganancia:[this.ingresomodel.getGanancia,[Validators.required]],
        stock:[this.ingresomodel.getcantidad,[Validators.required,Validators.pattern(/^[0-9]*\.?[0-9]?[0-9]$/)]]
      }
    )
  }
  buscarProducto()
  {
    this._consultaprod.buscarProducto(this.ingresomodel.getcodigo_barras,null)
    .subscribe((res:any)=>
      {
        this.ingresomodel.setcodigo_producto=res.codigo_producto;
        this.forma.setValue(
          {
            codigo_barras:this.ingresomodel.getcodigo_barras,
            nombre_producto:res.nombre_producto,
            precio_compra:res.precio_compra,
            precio_venta:res.precio_venta,
            ganancia:res.precio_venta-res.precio_compra,
            stock:0
          }
        ,{emitEvent:false});
        console.log(this.ingresomodel);
      })
  }
  onValueChanges()
  {
    this.forma.get("codigo_barras").valueChanges
    .pipe(debounceTime(500))
    .subscribe(res=>
      {
        this.ingresomodel.setcodigo_barras=res;
        this.buscarProducto();
      });

    this.forma.valueChanges
    .subscribe(res=>
      {
        const pv=this.forma.get("precio_venta").value;
        const pc=this.forma.get("precio_compra").value;
        this.forma.get("ganancia").setValue(pv-pc,{emitEvent:false});
        this.ingresomodel.setnombre_producto=res.nombre_producto;
        this.ingresomodel.setPrecio_Compra=res.precio_compra;
        this.ingresomodel.setprecio_unitario=res.precio_venta;
        this.ingresomodel.setcantidad=res.stock;
        this.ingresomodel.getGanancia;
      });
  }
  onSubmit()
  {
    if(this.forma.valid)
    {
    this.alertInfo("Ingresando Stock","info",false,"Espere por favor...");
    Swal.showLoading();
    this._ingresoService.ingresarStock(this.ingresomodel)
    .subscribe((res:any)=>
      {
        if(res.mensaje)
        {
          this.n_factura=uuidv4();
          const carrito:any=[{...this.ingresomodel}];
          this.costo=carrito[0].cantidad*carrito[0].precio_unitario;
          this._ingresomov.ingresarMovimiento(carrito,this.n_factura,IngresarProductoComponent.comentario,this.costo,IngresarProductoComponent.tipo)
          .subscribe(res2=>
            {
              this.alertInfo(res.mensaje,"success",false);
              this.resetForm();
             
            },error=>
            {
              this.alertInfo("Error desconocido","error",false,"Comuniquese con el desarrollador"); 
            })  
        }
        else
        {
          this.alertInfo("Error desconocido","error",false,"Comuniquese con el desarrollador"); 
        }
      });
    }
  }
  alertInfo(title:String,icon:SweetAlertIcon,allowOutsideClick:boolean,text?:string)
  {
    Swal.fire(
      {
        title:title,
        text:text,
        icon:icon,
        allowOutsideClick:allowOutsideClick
      }
    )
  }
  resetForm()
  {
    this.forma.reset();
    this.n_factura="";
    this.costo=null;
  }
  campoInvalido(input:string)
  {
    return this.forma.get(input).invalid && this.forma.get(input).touched;
  }

}

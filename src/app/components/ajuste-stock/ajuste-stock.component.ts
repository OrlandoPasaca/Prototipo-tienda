import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'
import { AjusteStockModel } from 'src/app/modelo/ajuste-stock.model';
import { ConsultaprodCajaService } from 'src/app/services/consultaprod-caja.service';
import { IngresarStockService } from 'src/app/services/ingresar-stock.service';
import { IngresarMovimientoService } from 'src/app/services/ingresar-movimiento.service';
import {v4 as uuidv4} from 'uuid';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-ajuste-stock',
  templateUrl: './ajuste-stock.component.html',
  styleUrls: ['./ajuste-stock.component.css']
})
export class AjusteStockComponent implements OnInit {

  forma:FormGroup;
  ajustemodel:AjusteStockModel;
  n_factura;
  constructor(private fb:FormBuilder,
              private consultaprod:ConsultaprodCajaService,
              private _ingresostock:IngresarStockService,
              private ingresomov:IngresarMovimientoService) 
  {
  this.ajustemodel=new AjusteStockModel();
  this.crearFormulario();
  this.onValueChanges();
   }

  crearFormulario()
  {
    this.forma=this.fb.group(
      {
        codigo_barras:["",[Validators.required]],
        nombre_producto:["",[Validators.required]],
        precio_venta:["",[Validators.required,Validators.pattern(/^(\-|[0-9]*)\.?[0-9]?[0-9]$/)]],
        stock:["",[Validators.required,Validators.pattern(/^(\-|[0-9]*)\.?[0-9\-]?[0-9]$/)]],
        stock_actual:["",[Validators.required,Validators.pattern(/^(\-|[0-9]*)\.?[0-9]?[0-9]$/)]],
        total:["",[Validators.required,Validators.pattern(/^(\-|[0-9]*)\.?[0-9]?[0-9]$/)]],
        comentario:[""]
      }
    )
  }
  buscarProducto(res)
  {
    this.consultaprod.buscarProducto(res,null)
    .subscribe((res2:any)=>
      {
        this.ajustemodel.setPrecio_Compra=res2.precio_compra;
        this.ajustemodel.setcodigo_producto=res2.codigo_producto;
        this.forma.setValue(
          {
            codigo_barras:this.ajustemodel.getcodigo_barras,
            nombre_producto:res2.nombre_producto,
            precio_venta:res2.precio_venta,
            stock:"",
            stock_actual:res2.stock_actual,
            total:"0",
            comentario:""
          },{emitEvent:false}
        )
      })
  }
  onValueChanges()
  {
    this.forma.get("codigo_barras").valueChanges
    .pipe(debounceTime(500))
    .subscribe(res=>
      {
        this.ajustemodel.setcodigo_barras=res;
        this.buscarProducto(res);
      });
    this.forma.valueChanges
    .subscribe(res=>
      {
        this.ajustemodel.setnombre_producto=res.nombre_producto;
        this.ajustemodel.setprecio_unitario=res.precio_venta;
        this.ajustemodel.setcantidad=res.stock;
        this.ajustemodel.getGanancia;
        this.forma.get("total").setValue(this.ajustemodel.getTotal,{emitEvent:false});
        
        console.log(this.ajustemodel);
      })
  }
  campoInvalido(input:string)
  {
    return this.forma.get(input).invalid && this.forma.touched;
  }
  onSubmit()
  {
    
    this._ingresostock.ingresarStock(this.ajustemodel)
    .subscribe((res:any)=>
      {
        if(res.mensaje)
        {
          this.n_factura=uuidv4();
          const carrito=[{...this.ajustemodel}];
          this.ingresomov.ingresarMovimiento
          (carrito,this.n_factura,this.forma.get("comentario").value,this.forma.get("total").value,"ajuste de stock")
          .subscribe((res:any)=>
            {
              if(res.mensajemov)
              {
                this.alertInfo("Se agrego correctamente","success",false);
                this.resetForm();
              }
              else
              {
                this.alertInfo("Error","error",false,"Ocurrio algo comuniquese con el desarrollador")
              }
            },error=>
            {
              this.alertInfo("Error","error",false,"Ocurrio algo comuniquese con el desarrollador")
            })
        }
      })
    
  }
  alertInfo(title:string,icon:SweetAlertIcon,allwOutsideClick:boolean,text?:string)
  {
    Swal.fire(
      {
        title:title,
        text:text,
        icon:icon,
        allowOutsideClick:allwOutsideClick
      }
    )
  }
  resetForm()
  {
    this.forma.reset();
    this.n_factura="";
  }
  ngOnInit(): void {
  }

}

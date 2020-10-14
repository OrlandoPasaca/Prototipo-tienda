import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { ReporteVentasModel } from 'src/app/modelo/reporte-ventas.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  providers: [ DatePipe ] 
})
export class MovimientosComponent implements OnInit {
  report_venta:ReporteVentasModel;
  
  forma:FormGroup;
  check:boolean;
  options;
  data;
  reporte;
  constructor(private fb:FormBuilder,private datepipe:DatePipe,private _ventaservice:VentasService) 
  {
    this.check=false;
    this.report_venta=new ReporteVentasModel();
    
    this.crearFormulario();
    this.onValueChange();
  }
  crearFormulario()
  {
    this.forma=this.fb.group(
      {
        check:[this.check,Validators.required],
        codigo:[this.report_venta.getcodigo,[Validators.pattern(/^[0-9]*[0-9]$/),Validators.required]],
        desde:[this.datepipe.transform(this.report_venta.getdesde,'yyyy-MM-dd'),Validators.required],
        hasta:[this.datepipe.transform(this.report_venta.gethasta,'yyyy-MM-dd'),Validators.required]
      }
    )
  }
  onValueChange()
  {
    this.forma.valueChanges.subscribe(res=>
      {
        this.check=res.check;
        this.report_venta.setcodigo=res.codigo;
        this.report_venta.setdesde=res.desde;
        this.report_venta.sethasta=res.hasta;
        if(res.check==false)
        {
          this.report_venta.setcodigo=null;
          this.forma.get("codigo").setValue(null,{emitEvent:false});
          this.forma.get("codigo").setValidators([Validators.pattern(/^[0-9]*[0-9]$/)]);
        }
        else
        {
          this.forma.get("codigo").setValidators([Validators.pattern(/^[0-9]*[0-9]$/),Validators.required]);
        }
        
        
      })
  }
  onSubmit()
  {
    this.data=null;
    this.reporte=null;
    this.options=null;
    console.log(this.forma.value);
    console.log(this.report_venta)
    Swal.fire(
      {
        title:"Generando Reporte",
        text:"Espere por favor...",
        icon:"info",
        allowOutsideClick:true
      }
    );
    Swal.showLoading();
    if(this.forma.valid)
    {
      this._ventaservice.obtenerReporte(this.report_venta).subscribe((res:any)=>
        {
            console.log(res);
            if(Object.keys(res).length>0)
            {
            this.reporte=res;
            Swal.close();
            }
            else
            {
              Swal.fire(
                {
                  title:"Ocurrio algo",
                  text:"No se genero ningun reporte porque no se encontraron datos entre las fechas indicadas",
                  icon:"info",
                  allowOutsideClick:true
                }
              );
            }
        })
    }
  }
  crearExcelReporte()
  {
      const date=new Date();
      let headers=Object.keys(this.reporte["0"]);
      this.options = { 
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Reporte de ventas',
      useBom: true,
      noDownload: false,
      headers: headers
    };
    
    var datos=[];
            
            for(var reporte in this.reporte)
            {
              datos.push(this.reporte[reporte]);
            }

    
     
   new Angular5Csv(datos, 'Ventas_'+date ,this.options);
 
  }
/* var options = { 
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'My Report',
      useBom: true,
      noDownload: true,
      headers: ["Name", "Age", "Average","Approved", "Description"]
    };
    var data = [
      {
        name: "Test 1",
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' "
      }
    ]; */
     
/*     new Angular5Csv(data, 'My Report',options);
 */ 

  ngOnInit(): void {

    this.forma.get("desde").setValue(this.datepipe.transform(this.report_venta.getdesde,'yyyy-MM-dd'));
    this.forma.get("hasta").setValue(this.datepipe.transform(this.report_venta.gethasta,'yyyy-MM-dd'));
  }

}

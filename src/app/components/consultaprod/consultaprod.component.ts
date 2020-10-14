import { Component, OnInit } from '@angular/core';
import { ConsultaprodService } from 'src/app/services/consultaprod.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaProdModel } from 'src/app/modelo/consultaprod.model';

@Component({
  selector: 'app-consultaprod',
  templateUrl: './consultaprod.component.html',
  styleUrls: ['./consultaprod.component.css']
})
export class ConsultaprodComponent implements OnInit {
  consultaprodmodel:ConsultaProdModel;
  forma:FormGroup;
  array_respuesta:object[];
  productos:object;
  spinner:boolean=false;
  constructor(private _consultaprodservice:ConsultaprodService,private fb:FormBuilder) 
  {
    this.consultaprodmodel=new ConsultaProdModel();
    this.crearformulario();
    this.onValueChanges();
  }

  ngOnInit(): void {
  }
  consultarproducto()
  {
    this._consultaprodservice.consultarproducto(this.consultaprodmodel).subscribe(res=>
      {
        console.log(res);
      })
  }
  crearformulario()
  {
    this.forma=this.fb.group(
      {
        codigo_barras:[""],
        codigo_producto:[""],
        nombre_prod:[""]
      }
    )
  }
  onValueChanges()
  {
    this.forma.valueChanges.subscribe(res=>
      {
        this.consultaprodmodel.setCodigoBarras=res.codigo_barras;
        this.consultaprodmodel.setCodigoProducto=res.codigo_producto;
        this.consultaprodmodel.setNombreProd=res.nombre_prod;
        console.log(this.consultaprodmodel);
      })
  }
  onSubmit()
  {
    this.spinner=true;
    this._consultaprodservice.consultarproducto(this.consultaprodmodel).subscribe((res:any)=>
      { 
        this.spinner=false;
        this.productos=Object.values(res);
        console.log(res);
        console.log(this.productos);
      })
  }


}

import {RouterModule,Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { IngresarProductoComponent } from './ingresar-producto.component';
const routes:Routes=[
    {
        path:"",component:IngresarProductoComponent
    }
];
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule],
    }
)
export class IngresarProductoRouting{}
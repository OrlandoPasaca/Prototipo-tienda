import {RouterModule,Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import { AjusteStockComponent } from './ajuste-stock.component';
const routes:Routes=[
    {
        path:"",component:AjusteStockComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class AjusteStockRouting{}

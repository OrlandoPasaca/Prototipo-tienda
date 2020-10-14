import {RouterModule,Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { CajaComponent } from './caja.component';

const routes:Routes=[
    {
        path:"",component:CajaComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class CajaRoutingModule{}
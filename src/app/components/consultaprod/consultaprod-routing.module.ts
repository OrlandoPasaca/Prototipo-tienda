import {RouterModule,Routes} from '@angular/router';
import { ConsultaprodComponent } from '../consultaprod/consultaprod.component';
import { NgModule } from '@angular/core';

const routes:Routes=[
    {
        path:"", component:ConsultaprodComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class ConsultaProdRouting{}

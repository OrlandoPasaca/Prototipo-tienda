import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { RegistroprodComponent } from './registroprod.component';

const routes:Routes=[
    {path:"",component:RegistroprodComponent}
];

@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class RegistroprodRoutingModule{}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {
    path:"login",
    loadChildren:()=>import("./components/login/login.module").then(m=>m.LoginModule)
  },
  {
    path:"registro_productos",
    loadChildren:()=>import("./components/registroprod/registroprod.module").then(m=>m.RegistroprodModule),
    canLoad:[LoginGuard]
  },
  {
    path:"home",
    loadChildren:()=>import("./components/home/home.module").then(m=>m.HomeModule),
    canLoad:[LoginGuard]
  },
  {
    path:"consulta_productos",
    loadChildren:()=>import("./components/consultaprod/consultaprod.module").then(m=>m.ConsultaprodModule),
    canLoad:[LoginGuard]
  },
  {
    path:"caja",
    loadChildren:()=>import('./components/caja/caja.module').then(m=>m.CajaModule),
    canLoad:[LoginGuard]
  },
  {
    path:"movimientos",
    loadChildren:()=>import('./components/movimientos/movimientos.module').then(m=>m.MovimientosModule),
    canLoad:[LoginGuard]
  },
  {
    path:"ingresar_stock",
    loadChildren:()=>import("./components/ingresar-producto/ingresar-producto.module").then(m=>m.IngresarProductoModule),
    canLoad:[LoginGuard]
  },
  {
    path:"ajuste_stock",
    loadChildren:()=>import("./components/ajuste-stock/ajuste-stock.module").then(m=>m.AjusteStockModule),
    canLoad:[LoginGuard]
  },
  {
    path:"**",pathMatch:"full",redirectTo:"login"
  },
  
  {
    path:"",pathMatch:"full",redirectTo:"login"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

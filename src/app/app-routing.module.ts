import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodMasterComponent } from './pages/food-master/food-master.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuMasterComponent } from './pages/menu-master/menu-master.component';
import { OrderComponent } from './pages/order/order.component';
import { TableMasterComponent } from './pages/table-master/table-master.component';
import { TablesComponent } from './pages/tables/tables.component';

const routes: Routes = [
  {path:'food-master',component:FoodMasterComponent},
  {path:'menu-master',component:MenuMasterComponent},
  {path:'invoice',component:InvoiceComponent},
  {path:'tables',component:TablesComponent},
  {path:'table-master',component:TableMasterComponent},
  {path:'order',component:OrderComponent},
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

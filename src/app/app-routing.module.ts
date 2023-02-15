import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { FoodMasterComponent } from './pages/food-master/food-master.component';
import { FoodComponent } from './pages/food/food.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { MenuDisplayComponent } from './pages/menu-display/menu-display.component';
import { MenuMasterComponent } from './pages/menu-master/menu-master.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TableMasterComponent } from './pages/table-master/table-master.component';
import { TablesComponent } from './pages/tables/tables.component';

const routes: Routes = [
  {path:'food-master',component:FoodMasterComponent},
  {path:'menu-master',component:MenuMasterComponent},
  {path:'invoice',component:InvoiceComponent},
  {path:'tables',component:TablesComponent},
  {path:'menu',component:MenuDisplayComponent},
  {path:'create-order',component:CreateOrderComponent},
  {path:'table-master',component:TableMasterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

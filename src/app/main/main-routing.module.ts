import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/Auth.Guard';
import { mainComponent } from './main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FoodMasterComponent } from './pages/food-master/food-master.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { MenuMasterComponent } from './pages/menu-master/menu-master.component';
import { OrderComponent } from './pages/order/order.component';
import { TableMasterComponent } from './pages/table-master/table-master.component';
import { TablesComponent } from './pages/tables/tables.component';

const routes: Routes = [
  {path:'',component:mainComponent,children:[
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{"backEndDependency":["invoice"]}},
    {path:'food-master',component:FoodMasterComponent,canActivate:[AuthGuard],data:{"backEndDependency":['food','menu']}},
    {path:'menu-master',component:MenuMasterComponent,canActivate:[AuthGuard],data:{"backEndDependency":['menu']}},
    {path:'invoice',component:InvoiceComponent,canActivate:[AuthGuard],data:{"backEndDependency":['table','food','menu']}},
    {path:'tables',component:TablesComponent,canActivate:[AuthGuard],data:{"backEndDependency":['table']}},
    {path:'table-master',component:TableMasterComponent,canActivate:[AuthGuard],data:{"backEndDependency":['table']}},
    {path:'order',component:OrderComponent,canActivate:[AuthGuard],data:{"backEndDependency":['table','food','menu','order','orderItems']}},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

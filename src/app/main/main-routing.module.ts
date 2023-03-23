import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/Auth.Guard';
import { mainComponent } from './main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FoodMasterComponent } from './pages/food-master/food-master.component';
import { invoiceListComponent } from './pages/invoiceList/invoiceList.component';
import { MenuMasterComponent } from './pages/menu-master/menu-master.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableMasterComponent } from './pages/table-master/table-master.component';
import { TablesComponent } from './pages/tables/tables.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

const routes: Routes = [
  {path:'',component:mainComponent,children:[
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{"pageName":"dashboard"}},
    {path:'food-master',component:FoodMasterComponent,canActivate:[AuthGuard],data:{"pageName":'food master'}},
    {path:'menu-master',component:MenuMasterComponent,canActivate:[AuthGuard],data:{"pageName":'menu master'}},
    {path:'tables',component:TablesComponent,canActivate:[AuthGuard],data:{"pageName":'order placing panel'}},
    {path:'table-master',component:TableMasterComponent,canActivate:[AuthGuard],data:{"pageName":'table master'}},
    {path:'users',component:UsersListComponent,canActivate:[AuthGuard],data:{"pageName":'users'}},
    {path:'profile',component:ProfileComponent,data:{"pageName":'profile'}},
    {path:'invoice-list',component:invoiceListComponent,data:{"pageName":'invoice list'}},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

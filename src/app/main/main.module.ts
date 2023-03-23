import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainFooterComponent } from './common/main-footer/main-footer.component';
import { ContentWrapperComponent } from './common/content-wrapper/content-wrapper.component';
import { MainSidebarComponent } from './common/main-sidebar/main-sidebar.component';
import { MainHeaderComponent } from './common/main-header/main-header.component';
import { mainComponent } from './main.component';
import { TablesComponent } from './pages/tables/tables.component';
import { TableMasterComponent } from './pages/table-master/table-master.component';
import { MenuMasterComponent } from './pages/menu-master/menu-master.component';
import { FoodMasterComponent } from './pages/food-master/food-master.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { ProfileComponent } from './pages/profile/profile.component';
import { invoiceListComponent } from './pages/invoiceList/invoiceList.component';
import { OrderAndInvoiceComponent } from './pages/order-and-invoice/order-and-invoice.component';
import { UsersListComponent } from './pages/users-list/users-list.component';


@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    MainFooterComponent,
    DashboardComponent,
    mainComponent,
    TablesComponent,
    TableMasterComponent,
    MenuMasterComponent,
    FoodMasterComponent,
    ProfileComponent,
    invoiceListComponent,
    OrderAndInvoiceComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DropdownModule
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainFooterComponent } from './common/main-footer/main-footer.component';
import { ControllSidebarComponent } from './common/controll-sidebar/controll-sidebar.component';
import { ContentWrapperComponent } from './common/content-wrapper/content-wrapper.component';
import { MainSidebarComponent } from './common/main-sidebar/main-sidebar.component';
import { MainHeaderComponent } from './common/main-header/main-header.component';
import { mainComponent } from './main.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { TablesComponent } from './pages/tables/tables.component';
import { TableMasterComponent } from './pages/table-master/table-master.component';
import { MenuMasterComponent } from './pages/menu-master/menu-master.component';
import { FoodMasterComponent } from './pages/food-master/food-master.component';
import { OrderComponent } from './pages/order/order.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControllSidebarComponent,
    MainFooterComponent,
    DashboardComponent,
    mainComponent,
    InvoiceComponent,
    TablesComponent,
    TableMasterComponent,
    MenuMasterComponent,
    FoodMasterComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DropdownModule
  ]
})
export class MainModule { }

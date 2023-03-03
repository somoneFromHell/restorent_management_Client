import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { InvoiceComponent } from './invoice/invoice.component';
import { TablesComponent } from './tables/tables.component';
import { TableMasterComponent } from './table-master/table-master.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuMasterComponent } from './menu-master/menu-master.component';
import { FoodMasterComponent } from './food-master/food-master.component';
import {  DropdownModule} from 'primeng/dropdown';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component'



@NgModule({
  declarations: [
    InvoiceComponent,
    TablesComponent,
    TableMasterComponent,
    MenuMasterComponent,
    FoodMasterComponent,
    OrderComponent,
    LoginComponent  ],
  imports: [
    CommonModule,
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
export class PagesModule { }

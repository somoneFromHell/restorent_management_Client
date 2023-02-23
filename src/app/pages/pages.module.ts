import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FoodComponent } from './food/food.component';
import { MenuComponent } from './menu/menu.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TablesComponent } from './tables/tables.component';
import { MenuDisplayComponent } from './menu-display/menu-display.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { TableMasterComponent } from './table-master/table-master.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuMasterComponent } from './menu-master/menu-master.component';
import { FoodMasterComponent } from './food-master/food-master.component';
import {  DropdownModule} from 'primeng/dropdown';
import { OrderComponent } from './order/order.component'



@NgModule({
  declarations: [
    FoodComponent,
    MenuComponent,
    InvoiceComponent,
    TablesComponent,
    MenuDisplayComponent,
    CreateOrderComponent,
    TableMasterComponent,
    MenuMasterComponent,
    FoodMasterComponent,
    OrderComponent  ],
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

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



@NgModule({
  declarations: [
    FoodComponent,
    MenuComponent,
    InvoiceComponent,
    TablesComponent,
    MenuDisplayComponent,
    CreateOrderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class PagesModule { }

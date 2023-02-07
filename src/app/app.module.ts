import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './common/nav/nav.component';
import { FoodComponent } from './pages/food/food.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MainHeaderComponent } from './common/main-header/main-header.component';
import { MainSidebarComponent } from './common/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './common/content-wrapper/content-wrapper.component';
import { ControllSidebarComponent } from './common/controll-sidebar/controll-sidebar.component';
import { MainFooterComponent } from './common/main-footer/main-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FoodComponent,
    MenuComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControllSidebarComponent,
    MainFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

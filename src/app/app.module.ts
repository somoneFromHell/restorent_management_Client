import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from './common/main-header/main-header.component';
import { MainSidebarComponent } from './common/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './common/content-wrapper/content-wrapper.component';
import { ControllSidebarComponent } from './common/controll-sidebar/controll-sidebar.component';
import { MainFooterComponent } from './common/main-footer/main-footer.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { DropdownModule} from 'primeng/dropdown'
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControllSidebarComponent,
    MainFooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { registerComponent } from './auth/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'main',loadChildren:()=>import('./main/main.module').then((m)=>m.MainModule)},
  {path:'login',component:LoginComponent},
  {path:'register',component:registerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

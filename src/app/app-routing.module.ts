import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './pages/food/food.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {path:'food',component:FoodComponent},
  {path:'menu',component:MenuComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';

const routes: Routes = [
  {path: 'search/:searchTerm' , component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'food/:food', component:FoodPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

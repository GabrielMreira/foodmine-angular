import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!:Food;
  constructor(acticatedRoute:ActivatedRoute, foodService:FoodService, private cartService:CartService, private router:Router){
    acticatedRoute.params.subscribe((param) => {
      if(param){
        foodService.getFoodById(param.food).subscribe(serverFood => {
          this.food = serverFood;
        });
      }
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}

import { Component } from '@angular/core';
import { PizzaOrderService } from 'src/app/pizza-order.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.scss' ]
})
export class CheckoutComponent {
  order: string;
  offers = [
    { pizzaImg: './assets/images/italian.png', description: 'huge pizza suitable for party', pizzaName: 'italian', pizzaHolder: 'bob' },
    { pizzaImg: './assets/images/friends.jpg', description: 'huge pizza suitable for party', pizzaName: 'friends', pizzaHolder: 'bob' },
    { pizzaImg: './assets/images/hurt.jpg', description: 'huge pizza suitable for party', pizzaName: 'hurt', pizzaHolder: 'bob' },
  ];

  constructor(private pizzaOrderService: PizzaOrderService, private authService: AuthService) {
  }


  sendOrder(quantity: string, name: string) {
    this.pizzaOrderService.sendOrder({quantity, name}).subscribe(console.log);
    this.order = '';
  }

}

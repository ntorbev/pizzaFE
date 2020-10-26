import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { PizzaOrderService } from 'src/app/pizza-order.service';

@Component({
  selector: 'app-message-room',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.scss' ]
})
export class CheckoutComponent {
  order: string;
  offers: [];

  constructor(private pizzaOrderService: PizzaOrderService, private authService: AuthService) {
  }

  sendOrder() {
    this.pizzaOrderService.sendOrder(this.order).subscribe(console.log);
    this.order = '';
  }

}

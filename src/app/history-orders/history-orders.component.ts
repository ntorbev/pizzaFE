import { Component, OnInit } from '@angular/core';
import { PizzaOrderService } from 'src/app/pizza-order.service';

@Component({
  selector: 'app-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: [ './history-orders.component.scss' ]
})
export class HistoryOrdersComponent implements OnInit {
  orders: {
    holderName: string
    id: number
    orderPizza: string
  }[];

  constructor(private messageService: PizzaOrderService) {
  }

  ngOnInit(): void {
    this.messageService.getOrders().subscribe(res => {
      this.orders = res;
    });
  }

}

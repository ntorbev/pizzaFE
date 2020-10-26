import { TestBed } from '@angular/core/testing';

import { PizzaOrderService } from 'src/app/pizza-order.service';

describe('MessageService', () => {
  let service: PizzaOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

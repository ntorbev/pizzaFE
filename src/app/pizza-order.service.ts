import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PizzaOrderService {
  private URL_INSERT = environment.insertPizzaOrder;
  private URL_GET_ORDERS = environment.getPizzaOrders;

  constructor(private http: HttpClient) {
  }

  sendOrder(order): Observable<any> {
    const getTokenParams = new HttpParams()
      .append('pizzaOrder', order.name)
      .append('quantity', order.quantity);

    return this.http.post<{ access_token: string; expires_in: number; scope: string; token_type: string }>(
      this.URL_INSERT,
      null,
      { params: getTokenParams }
    );
  }

  getOrders(): Observable<any> {
    return this.http.post<{ access_token: string; expires_in: number; scope: string; token_type: string }>(this.URL_GET_ORDERS, null);
  }
}

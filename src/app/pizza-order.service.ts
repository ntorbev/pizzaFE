import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PizzaOrderService {
  private URL_INSERT = environment.insertPizzaOrder;
  private URL_GET_ORDERS = environment.getPizzaOrders;
  private token: string;


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  sendOrder(order): Observable<any> {
    const token = this.authService.getToken();
    this.token = token;
    const getTokenParams = new HttpParams()
      .append('pizzaOrder', order);

    const getTokenHeaders = new HttpHeaders().append('Authorization', 'Bearer' + token);
    return this.http.post<{ access_token: string; expires_in: number; scope: string; token_type: string }>(
      this.URL_INSERT,
      { withCredentials: true },
      { headers: getTokenHeaders, params: getTokenParams }
    );
  }

  getOrders(): Observable<any> {
    const token = this.authService.getToken();

    const getTokenHeaders = new HttpHeaders().append('Authorization', 'Bearer' + token);
    return this.http.post<{ access_token: string; expires_in: number; scope: string; token_type: string }>(
      this.URL_GET_ORDERS,
      { withCredentials: true },
      { headers: getTokenHeaders}
    );
  }
}

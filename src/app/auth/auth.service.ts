import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL_TOKEN = environment.tokenUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  error: string;
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  private _userName: string;

  get userName(): string {
    return this._userName;
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(authData: AuthData) {
    const getTokenParams = new HttpParams()
      .append('grant_type', 'password')
      .append('username', authData.email)
      .append('password', authData.password);

    // const getTokenHeaders = new HttpHeaders().append('Authorization', 'Basic ' + btoa('client:secret'));
    this.http.post(
      'http://localhost:8080/api/insertUser',
      { withCredentials: true },
      { params: getTokenParams }
    )
      .subscribe(
        res => console.log(res),
        // res => this.router.navigate([ '/' ]),
        error => this.authStatusListener.next(false)
      );
  }

  login(authData: AuthData) {
    const getTokenParams = new HttpParams()
      .append('grant_type', 'password')
      .append('username', authData.email)
      .append('password', authData.password);

    this.http.post<{ access_token: string; expires_in: number; scope: string; token_type: string }>(
      BACKEND_URL_TOKEN,
      { withCredentials: true },
      { params: getTokenParams }
    ).subscribe(
      response => {
        const token = response.access_token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expires_in;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate([ '/' ]);
        }
      },
      error => this.authStatusListener.next(false)
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate([ '/' ]);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}

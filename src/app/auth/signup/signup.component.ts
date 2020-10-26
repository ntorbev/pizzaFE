import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit, OnDestroy {
  form = {
    username: '',
    password: ''
  };
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => this.isLoading = false);
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.createUser({ email, password });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
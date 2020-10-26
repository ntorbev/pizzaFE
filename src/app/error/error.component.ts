import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  templateUrl: './error.component.html',
  styleUrls: [ './error.component.css' ]
})
export class ErrorComponent implements OnInit, OnDestroy {
  closable: any;

  constructor(private router: Router, private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: { message: string }) {
  }

  // constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  ngOnDestroy() {
    // this.errorSub.unsubscribe();
  }

  closeModal() {
    this.closable = false;
    this.router.navigate([ '/auth' ]);
  }

  ngOnInit(): void {
    this.closable = this.authService.error;
  }
}

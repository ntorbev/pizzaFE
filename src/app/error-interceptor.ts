import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import { ErrorComponent } from 'src/app/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.authService.error = error.error.message || 'An unknown error occurred!';
        this.dialog.open(ErrorComponent, {data: {message: error.error.error}});
        return throwError(error);
      })
    );
  }
}

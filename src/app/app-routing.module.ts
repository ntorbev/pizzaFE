import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryOrdersComponent } from 'src/app/history-orders/history-orders.component';
import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './error/error.component';
import { CheckoutComponent } from 'src/app/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent, canActivate: [ AuthGuard ] },
  { path: 'history', component: HistoryOrdersComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}

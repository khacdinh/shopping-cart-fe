import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { CartGuardService } from './guard/cart-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [CartGuardService] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

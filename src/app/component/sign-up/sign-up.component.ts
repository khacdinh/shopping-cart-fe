import { CustomerService } from '../../service/customer-service/customer.service';
import { Component } from '@angular/core';
import { ISignUp } from '../../model/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router) {}

  fullName: string = "";
  password: string = "";
  email: string = "";
  address: string = "";
  city: string = "";
  country: string = "";
  phone: string = "";

  signUp() {
    const body: ISignUp = {
      email: this.email,
      fullName: this.fullName,
      password: this.password,
      address: this.address,
      city: this.city,
      country: this.country,
      phone: this.phone
    }
    this.customerService.signUp(body).subscribe(() => {
      alert("Sign up successfully!!!")
      this.router.navigate(['log-in']);
    })

  }
}

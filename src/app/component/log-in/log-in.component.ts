import { IntermediaryService } from 'src/app/service/intermediary-service/intermediary.service';
import { USER_LOCAL_KEY } from '../../constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { ILogIn } from '../../model/customer';
import { CustomerService } from '../../service/customer-service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private intermediaryService: IntermediaryService
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem(USER_LOCAL_KEY);
    if (userId !== null) {
      this.router.navigate(['home']);
    }
  }

  logIn() {
    const body: ILogIn = {
      email: this.email,
      password: this.password,
    };
    this.customerService.logIn(body).subscribe({
      next: (userId) => {
        sessionStorage.setItem(USER_LOCAL_KEY, JSON.stringify(userId));
        this.intermediaryService.userIdSubject.next(+userId);

        this.router.navigate(['home']);
      },
      error: (e) => {
        alert(e.error);
      },
    });
  }
}

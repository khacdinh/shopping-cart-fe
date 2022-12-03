import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/app.constants';
import { ILogIn, ISignUp } from 'src/app/model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private service: string = "customer";

  signUp(body: ISignUp) {
    return this.http.post(`${BASE_URL}/${this.service}`, body);
  }

  logIn(body: ILogIn) {
    return this.http.post(`${BASE_URL}/${this.service}/log-in`, body);
  }
}

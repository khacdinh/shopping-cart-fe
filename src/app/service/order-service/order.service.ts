import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants/app.constants';
import { IOrder } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(body: IOrder) {
    return this.http.post(`${BASE_URL}/order`, body);
  }
}

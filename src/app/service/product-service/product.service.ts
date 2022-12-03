import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/app.constants';
import { IProduct } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  service: string  = "products";
  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${BASE_URL}/${this.service}`);
  }

}

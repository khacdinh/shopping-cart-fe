import { IntermediaryService } from '../../service/intermediary-service/intermediary.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../service/product-service/product.service';
import { map } from 'rxjs';
import { IProduct } from '../../model/product';
import { CART_LOCAL_KEY, USER_LOCAL_KEY } from '../../constants/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private productsService: ProductService,
    private intermediaryService: IntermediaryService) { }

  products: IProduct[] = [];
  cartBadgeQuantity: number = 0;
  userId: number = -1;

  ngOnInit() {
    this.intermediaryService.userIdSubject.subscribe((userId: number) => this.userId = userId);
    const userId = sessionStorage.getItem(USER_LOCAL_KEY);
    if (userId) {
      this.userId = +userId;
      this.intermediaryService.userIdSubject.next(+userId);
    }

    this.productsService
      .getProducts()
      .pipe(
        map(products => {
          const localObj = localStorage.getItem(CART_LOCAL_KEY);
          let historyCart: IProduct[];

          if (localObj !== null) {
            historyCart = JSON.parse(localObj);
            this.calculateCartBadgeQuantity(historyCart);
          } else {
            historyCart = [];
          }

          products.forEach((prod: IProduct) => {
            prod.image = `data:image/png;base64, ${prod.image}`;
            prod.toBuyQuantity = 0;
          });

          return products;
        }))
      .subscribe((products) => {
        this.products = products;
      })
  }

  increase(prod: IProduct) {
    if (prod.quantity > 0) {
      prod.quantity--;
      prod.toBuyQuantity++;
    } else {
      alert("No more product available!!!")
    }
  }

  decrease(prod: IProduct) {
    if (prod.toBuyQuantity > 0) {
      prod.quantity++;
      prod.toBuyQuantity--;
    }
  }

  addToCart(prod: IProduct) {
    let localObj = localStorage.getItem(CART_LOCAL_KEY);
    let historyCart: IProduct[];

    if (localObj !== null) {
      historyCart = JSON.parse(localObj);
    } else {
      historyCart = [];
    }

    const i = historyCart.findIndex((p: IProduct) => p.id === prod.id);
    if (i !== -1) {
      historyCart[i].quantity = prod.quantity;
      historyCart[i].toBuyQuantity += prod.toBuyQuantity;
    } else {
      historyCart.push(prod);
    }

    this.calculateCartBadgeQuantity(historyCart);
    localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(historyCart));
    prod.toBuyQuantity = 0;
  }


  private calculateCartBadgeQuantity(productList: IProduct[]) {
    this.intermediaryService.cartQuantitySubject.next(
        productList
          .map(v => v.toBuyQuantity)
          .reduce((pre, current) => pre + current, 0)
      )
  }
}

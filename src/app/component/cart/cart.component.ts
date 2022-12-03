import { IProduct, IOrder } from 'src/app/model/product';
import { IProductDetail } from '../../model/product';
import { Component } from '@angular/core';
import { CART_LOCAL_KEY, USER_LOCAL_KEY } from 'src/app/constants/app.constants';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Router } from '@angular/router';
import { IntermediaryService } from 'src/app/service/intermediary-service/intermediary.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(
    private intermediaryService: IntermediaryService,
    private orderService: OrderService,
    private router: Router) {
      this.getProductInCart();
      this.onDoWhenUpdateCart();
    }

  products: IProduct[] = [];
  totalPrice: number = 0;
  recipientName: string = "";
  shippingAddress: string = "";
  recipientPhone: string = "";

  increase(prod: IProduct) {
    if (prod.quantity > 0) {
      prod.quantity--;
      prod.toBuyQuantity++;
      this.onDoWhenUpdateCart();
    } else {
      alert("No more product available!!!")
    }
  }

  decrease(i: number) {
    const prod: IProduct = this.products[i];
    if (prod.toBuyQuantity > 1) {
      prod.quantity++;
      prod.toBuyQuantity--;
      this.onDoWhenUpdateCart();
    } else {
      this.removeFromCart(i);
    }
  }

  removeFromCart(i: number) {
    this.products.splice(i, 1);
    this.onDoWhenUpdateCart();
  }

  onSubmitOrder() {
    const userId = sessionStorage.getItem(USER_LOCAL_KEY);
    if (userId) {
      const body: IOrder = {
        customerId: +userId,
        recipientName: this.recipientName,
        shippingAddress: this.shippingAddress,
        recipientPhone: this.recipientPhone,
        products: []
      }
      this.products.map((p: IProduct) => {
        const prodDetail: IProductDetail = {
          id: p.id,
          quantity: p.toBuyQuantity
        }
        body.products.push(prodDetail);
      })

      this.orderService.order(body).subscribe({
        next: () => {
          this.clearAllCart();
        },
        error: (e) => {
          alert("Not enough products!!!")
        }
      });
    } else {
      this.router.navigate(['log-in'])
    }
  }

  private getProductInCart() {
    const localObj = localStorage.getItem(CART_LOCAL_KEY);

    if (localObj !== null) {
      this.products = JSON.parse(localObj);
    }
    this.calculateTotal();
  }

  private saveToLocal() {
    if (this.products.length === 0) {
      localStorage.removeItem(CART_LOCAL_KEY);
    } else {
      localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(this.products));
    }
  }

  private onDoWhenUpdateCart() {
    this.calculateTotal();
    this.saveToLocal();
    this.calculateCartBadgeQuantity(this.products);
  }

  private calculateTotal() {
    this.totalPrice = +this.products
    .map(v => v.price * v.toBuyQuantity)
    .reduce((pre, current) => pre + current, 0).toFixed(2);
  }

  private calculateCartBadgeQuantity(productList: IProduct[]) {
    this.intermediaryService.cartQuantitySubject.next(
        productList
          .map(v => v.toBuyQuantity)
          .reduce((pre, current) => pre + current, 0)
      )
  }

  private clearAllCart() {
    this.products = [];
    this.onDoWhenUpdateCart();
  }

}

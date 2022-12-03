import { Injectable, EventEmitter } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IntermediaryService {
  cartQuantitySubject = new BehaviorSubject<number>(0);
  userIdSubject = new BehaviorSubject<number>(0);
  private cartQuantity: number = 0;
  private userId: number = -1;
  constructor() {
    this.cartQuantitySubject.subscribe((quantity: number) => this.cartQuantity = quantity);
    this.userIdSubject.subscribe((userId: number) => this.userId = userId);
  }
  getQuantity(): number {
    return this.cartQuantity;
  }
  getUserId(): number {
    return this.userId;
  }
}

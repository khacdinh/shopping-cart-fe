import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USER_LOCAL_KEY } from 'src/app/constants/app.constants';
import { IntermediaryService } from 'src/app/service/intermediary-service/intermediary.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity: number = 0;
  userId: number = -1;
  constructor(
    private intermediaryService: IntermediaryService,
    private router: Router) {}

  ngOnInit() {
    this.intermediaryService.cartQuantitySubject.subscribe((cartQuantity: number) => this.cartQuantity = cartQuantity);
    this.intermediaryService.userIdSubject.subscribe((userId: number) => this.userId = userId);
    const userId = sessionStorage.getItem(USER_LOCAL_KEY);
    if (userId !== null) {
      this.userId = +userId;
    }
  }

  signOut() {
    sessionStorage.clear();
    this.userId = -1;
    this.router.navigate(['home'])
    this.intermediaryService.userIdSubject.next(-1);
  }
}

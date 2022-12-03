import { IntermediaryService } from 'src/app/service/intermediary-service/intermediary.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartGuardService implements CanActivate {

  constructor(private intermediaryService: IntermediaryService, private router: Router) { }

  canActivate() {  
    console.log(this.intermediaryService.getUserId());
      
    if (this.intermediaryService.getUserId() !== -1) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}

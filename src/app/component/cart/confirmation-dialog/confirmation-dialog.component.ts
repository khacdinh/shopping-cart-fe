import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IntermediaryService } from 'src/app/service/intermediary-service/intermediary.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @ViewChild("closeButton") closeButton!: ElementRef<HTMLButtonElement>;
  @Output("orderConfirm") orderConfirmEmitter: EventEmitter<boolean> = new EventEmitter();
  quantity: number = 0;

  constructor(
    private intermediaryService: IntermediaryService) {}
  ngOnInit() {
    this.intermediaryService.cartQuantitySubject.subscribe((quantity: number) => this.quantity = quantity);
    this.quantity = this.intermediaryService.getQuantity();
  }

  onSubmitOrder() {
    this.orderConfirmEmitter.emit(true);
    this.closeButton.nativeElement.click();
  }
}

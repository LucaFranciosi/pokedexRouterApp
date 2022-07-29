import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('true', style({
        display: 'block',
      })),
      state('false', style({
        display: 'none'
      })),
      transition('hidden<=>visible', [
        animate('0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000)')
      ])
    ])
  ]
})
export class ModalComponent {
  @Input() modalStatus: boolean = false;
  @Output() modalStatusChange = new EventEmitter();
  constructor() { }

  close() {
    return this.modalStatusChange.emit(false)
  }
}

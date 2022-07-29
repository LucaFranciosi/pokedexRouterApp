import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accordion-icon',
  templateUrl: './accordion-icon.component.html',
  styleUrls: ['./accordion-icon.component.scss']
})
export class AccordionIconComponent implements OnInit {
  @Input() isAccordionOpen: string;
  @Output() isAccordionOpenChange: EventEmitter<string> = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
    this.isAccordionOpen = 'closed';
  }
  toggleAccordion() {
    this.isAccordionOpen === 'closed' ?
      this.isAccordionOpenChange.emit('opened')
      : this.isAccordionOpenChange.emit('closed');
  }

}

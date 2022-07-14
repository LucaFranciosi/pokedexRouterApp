import { Component, Directive, ElementRef, HostBinding, HostListener, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Directive({
  selector: '[appAccordionIconDir]'
})
export class AccordionIconDirective   {
  imgPath: string;

  constructor(private el: ElementRef) {
    this.imgPath = '../../../../assets/img/slider_';
  }

  @HostBinding('isAccordionOpen') isAccordionOpen!: string;

   
  @HostListener('click') onClick() {
    if (this.isAccordionOpen === 'open') {
      this.isAccordionOpen = 'closed'
      this.el.nativeElement.style.backgroundImage = "url('../../../../assets/img/slider_closed.png')";
    } else {
      this.isAccordionOpen = 'open';
      this.el.nativeElement.style.backgroundImage = "url('../../../../assets/img/slider_opened.png')";
    }
  }
}
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

import { Directive, ElementRef, HostBinding, HostListener, OnInit, } from '@angular/core';



@Directive({
  selector: '[appAccordionIcon]'
})
export class AccordionIconDirective implements OnInit {
  imgPath: string;

  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    this.el.nativeElement.style.backgroundImage = 'url("../../../../assets/img/slider_closed.png")';

  }

  @HostBinding('isAccordionOpen') isAccordionOpen!: string;


  @HostListener('click') onClick() {
    if (this.isAccordionOpen === 'open') {
      this.isAccordionOpen = 'closed'
      this.el.nativeElement.style.backgroundImage = "url('../../../assets/img/slider_closed.png')";
    } else {
      this.isAccordionOpen = 'open';
      this.el.nativeElement.style.backgroundImage = "url('../../../assets/img/slider_opened.png')";
    }
  }
}
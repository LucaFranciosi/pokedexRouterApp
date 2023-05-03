import { Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FakeService } from 'src/app/core/services/pokemon/fake/fake-service.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { CarouselService } from 'src/app/shared/services/carousel-service/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() modalStatus: boolean;
  @Output() modalStatusChange = new EventEmitter<boolean>();
  currentList: Pokemon[] = [];
  currentListSubject: Subject<Pokemon[]> = this.fake.getCurrentListSubject();
  currentIndex: number;
  currentIndexSubject: Subject<number> = this.carouselSrv.getcurrentIndexSubject();
  subscription: Subscription;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.slide('REV')
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      this.slide('FFW')
    }
    if (event.key === 'Escape') {
      this.closeModal()
    }
  }



  constructor(public carouselSrv: CarouselService, public auth: AuthService, public fake: FakeService) {
    this.subscription = this.currentListSubject.subscribe((val: Pokemon[]) => this.currentList = val)
    this.subscription.add(this.currentIndexSubject.subscribe((val: number) => this.currentIndex = val))
  }

  closeModal() {
    this.modalStatusChange.emit(false);
  }


  slide(params: 'REV' | 'FFW') {
    if (this.currentIndex < this.currentList.length - 1 && params === 'FFW') {
      this.currentIndexSubject.next(this.currentIndex + 1)
    }
    if (this.currentIndex !== 0 && params === 'REV') {

      this.currentIndexSubject.next(this.currentIndex - 1)
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  
}
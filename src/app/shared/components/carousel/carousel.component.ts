import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { CarouselService } from 'src/app/shared/services/carousel-service/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
  @Input() modalStatus: boolean;
  @Output() modalStatusChange = new EventEmitter<boolean>();
  filteredList: Pokemon[];
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {



    switch (event.key) {
      case ("ArrowLeft"):
        if (this.carouselSrv.currentIndexValue !== 0) {
          this.slide('REV')
        }
        break;
      case ("ArrowUp"):
        if (this.carouselSrv.currentIndexValue !== 0) {
          this.slide('REV')
        }
        break;
      case ("ArrowRight"):
        if (this.carouselSrv.currentIndexValue <= this.pokemonSrv.currentListValue.length - 1) {
          this.slide('FFW')
        }
        break;
      case ("ArrowDown"):
        if (this.carouselSrv.currentIndexValue <= this.pokemonSrv.currentListValue.length - 1) {
          this.slide('FFW')
        }
        break;
      case ("Escape"):
        this.closeModal()
        break;

      default: break;
    }

  }
  constructor(public pokemonSrv: PokemonService, public carouselSrv: CarouselService, public cd: ChangeDetectorRef, public auth: AuthService) { }

  closeModal() {
    this.modalStatusChange.emit(false);
  }


  slide(params: 'REV' | 'FFW') {
    if (params === 'FFW') {
      if (this.carouselSrv.currentIndexValue < this.pokemonSrv.currentListValue.length - 1) {
        this.carouselSrv.updateCurrentIndex(this.carouselSrv.currentIndexValue + 1)
      }
    }
    else { this.carouselSrv.updateCurrentIndex(this.carouselSrv.currentIndexValue - 1) }
  }



}
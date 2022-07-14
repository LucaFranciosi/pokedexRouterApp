import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
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
export class CarouselComponent implements OnInit {
  @Input() modalStatus: boolean;
  @Output() modalStatusChange = new EventEmitter<boolean>();
  filteredList: Pokemon[];

  constructor(public pokemonSrv: PokemonService, public carouselSrv: CarouselService, public cd: ChangeDetectorRef, public auth: AuthService) {

  }

  ngOnInit(): void {
  }


  closeModal() {
    this.modalStatusChange.emit(false);
  }


  slide(params: 'REV' | 'FFW') {
    if (params === 'FFW') {
      if (this.carouselSrv.currentIndexValue < this.carouselSrv.getCaroLength(this.pokemonSrv, this.auth) - 1) {
        this.carouselSrv.updateCurrentIndex(this.carouselSrv.currentIndexValue + 1)
      }
    }
    else { this.carouselSrv.updateCurrentIndex(this.carouselSrv.currentIndexValue - 1) }
  }



}
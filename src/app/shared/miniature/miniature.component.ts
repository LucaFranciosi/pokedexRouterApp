import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { CarouselService } from 'src/app/shared/services/carousel-service/carousel.service';

@Component({
  selector: 'app-miniature',
  templateUrl: './miniature.component.html',
  styleUrls: ['./miniature.component.scss'],
})
export class MiniatureComponent implements OnInit {
  @Input() i: number;
  @Input() pokemon: Pokemon;
  @Input() modalStatus: boolean = false;
  @Output() modalStatusChange = new EventEmitter<boolean>();
  pokemonId: string;
  public isFavourite: boolean;

  constructor(public pokemonSrv: PokemonService, public auth: AuthService, public carouselSrv: CarouselService) { }



  ngOnInit(): void {
    this.i === this.pokemon.id;
    this.pokemonId = this.formatPokemonId();
    this.isFavourite = false;
    this.isFavourite = this.auth.currentUserValue.preferences?.indexOf(this.pokemon.id) !== -1;

  }
  openModal(param: number) {
    this.carouselSrv.updateCurrentIndex(param);
    this.modalStatusChange.emit(true);

  }

  formatPokemonId() {
    let pad = "000";
    let id = this.pokemon.id.toString()
    return pad.substring(0, pad.length - id.length) + id
  }

  pushPreferences(id: number) {
    let preferences: number[] = this.auth.currentUserValue.preferences;
    if (this.isFavourite) {
      preferences = [...preferences.splice(0, preferences.indexOf(id))];
      this.isFavourite = false
    }
    else {
      preferences = [...preferences, id];
      this.isFavourite = true;
    };
    this.auth.updateUser({ ...this.auth.currentUserValue, preferences });
    console.log(this.auth.currentUserValue.preferences)
    return this.auth.postFavourite(this.auth.currentUserValue)

  }



}

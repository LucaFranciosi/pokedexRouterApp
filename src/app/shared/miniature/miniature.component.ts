import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { User } from 'src/app/model/user/user.model';
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
  userSubject: Subject<User> = this.auth.getUserSubject()
  pokemonId: string;
  isFavourite: boolean;


  constructor(public pokemonSrv: PokemonService, public auth: AuthService, public carouselSrv: CarouselService) {
  }



  ngOnInit(): void {
    this.i === this.pokemon.id;
    this.pokemonId = this.formatPokemonId();
    this.isFavourite = this.auth.user.preferences.indexOf(this.pokemon.id) !== -1;
  }



  openModal(param: number) {
    this.carouselSrv.currentIndexSubject.next(param);
    this.modalStatusChange.emit(true);

  }

  formatPokemonId() {
    let pad = "000";
    let id = this.pokemon.id.toString()
    return pad.substring(0, pad.length - id.length) + id
  }

  pushPreferences(id: number) {
    let preferences: number[] = this.auth.user.preferences;
    if (this.isFavourite) {
      preferences.splice(preferences.indexOf(id))
      this.isFavourite = false;
    }
    else {
      preferences.push(id);
      this.isFavourite = true;
    };
    this.userSubject.next({ ...this.auth.user, preferences });
    return this.auth.postFavourite(this.auth.user)
  }



}

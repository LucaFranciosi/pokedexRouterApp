import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { User } from 'src/app/model/user/user.model';
import { CarouselService } from 'src/app/shared/services/carousel-service/carousel.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() i: number;
  @Input() pokemon!: Pokemon;
  pokemonId: string;
  stats: number[];
  isFavourite: boolean;
  user: User;
  userSubject = this.auth.getUserSubject();


  constructor(public carouselSrv: CarouselService, public auth: AuthService) {
    this.userSubject.subscribe(val => this.user = val)
  }



  ngOnInit(): void {
    this.pokemonId = this.formatPokemonId()
    this.stats = this.pokemon.stats.map((stats) => stats.base_stat);
    this.isFavourite = this.auth.user.preferences?.indexOf(this.pokemon.id) !== -1;
  }



  formatPokemonId() {
    let pad = "000";
    let id = this.pokemon.id.toString()
    return pad.substring(0, pad.length - id.length) + id
  }


  ngOnDestroy() {
    this.userSubject.unsubscribe()
  }
}

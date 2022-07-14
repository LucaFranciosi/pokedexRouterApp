import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  loading: boolean;
  modalStatus: boolean = false;
  isAccordionOpen: string = 'closed';


  constructor(public pokemonSrv: PokemonService, public auth: AuthService) {
  }

  handleModalFromHome(booleanValue: boolean) {
    return this.modalStatus = booleanValue;
  }

  handleAccordionFromHome(stringValue: string) {
    return this.isAccordionOpen = stringValue;
  }

  ngOnInit() {
    this.auth.getFavourite(this.auth.currentUserValue)
    this.pokemonSrv.getPokemon(30);
  }



}

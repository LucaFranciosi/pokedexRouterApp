import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})


export class HomeComponent implements OnInit {
  loading: boolean;
  modalStatus: boolean = false;
  showThis = false;

  constructor(public pokemonSrv: PokemonService, public auth: AuthService) {
  }



  handleModalFromHome(booleanValue: boolean) {


    return this.modalStatus = booleanValue;
  }

  ngOnInit() {
    this.auth.getFavourite(this.auth.currentUserValue)

  }



}

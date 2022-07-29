import {   Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  modalStatus: boolean = false;
 

  constructor(public auth: AuthService, public pokemonSrv: PokemonService,) {
  }

  ngOnInit(): void {

  }

 

}

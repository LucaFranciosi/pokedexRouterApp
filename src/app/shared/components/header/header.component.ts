import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public pokemonSrv: PokemonService) { }
  navBarStatus: string;


  logout() {
    this.auth.logout()
  }
  handleClick() {
    this.navBarStatus = 'opened'
  }

  openMenuFromHeader(stringValue: string) {
    return this.navBarStatus = stringValue;
  }

  ngOnInit(): void {
    this.navBarStatus = 'closed'
  }

}

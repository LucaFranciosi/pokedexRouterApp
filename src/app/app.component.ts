import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*   title = 'pokedexRouterApp';
   */
  state: string = 'closed';

  constructor(public auth: AuthService) { }

  openMenuFromHeader(stringValue: string) {
    return this.state = stringValue;
  }
}

import { Component, } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FakeService } from 'src/app/core/services/pokemon/fake/fake-service.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})


export class HomeComponent {
  modalStatus: boolean = false;
  currentList: Pokemon[] = [];
  currentListSubject: Subject<Pokemon[]> = this.fake.getCurrentListSubject();
  user: User;
  userSubject = this.auth.getUserSubject()


  constructor( public auth: AuthService, public fake: FakeService) {
    this.currentListSubject.subscribe((val: Pokemon[]) => this.currentList = val)
    this.userSubject.subscribe(val => this.user = val)
  }


  ngOnInit() {
    this.loadApi()
    this.auth.getFavourite()


  }

  handleModalFromHome(booleanValue: boolean) {
    return this.modalStatus = booleanValue;
  }


  loadApi() {
    this.fake.loadPokemonList(30);
  }
}





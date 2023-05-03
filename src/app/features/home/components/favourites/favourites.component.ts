import { Component } from '@angular/core';
import { add } from 'lodash';
import { map, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FakeService } from 'src/app/core/services/pokemon/fake/fake-service.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  modalStatus: boolean = false;
  currentList: Pokemon[] = [];
  currentListSubject: Subject<Pokemon[]> = this.fake.getCurrentListSubject();
  user: User;
  userSubject = this.auth.getUserSubject()
  subscription: Subscription;


  constructor(public auth: AuthService, public fake: FakeService) {
    this.subscription = this.currentListSubject.subscribe((val: Pokemon[]) => this.currentList = val)
    this.subscription.add(this.userSubject.subscribe(val => this.user = val))
  }


  ngOnInit() {
    console.log('loading favourites component');
    console.log(this.currentListSubject)
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

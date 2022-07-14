import { Input, Pipe, PipeTransform } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PokemonService } from 'src/app/core/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon/pokemon.model';
import sortBy from 'src/utils/js/sortBy';


@Pipe({
  name: 'filteredListPipe',
  pure: false,
})
export class FilteredListPipe implements PipeTransform {
  constructor(private auth: AuthService) {

  }
  transform(pokemonList: Pokemon[], form: FormGroup): Observable<Pokemon[]> {
    let filterParams = form.value;
    let input_search: string = filterParams.input_search;
    let order: string = filterParams.order;
    let favourites: boolean = filterParams.favourites;
    let pokeTypesControls: string[] = filterParams.pokeTypesControls

    let currentList = pokemonList.filter(
      pokemon => pokeTypesControls.map(type =>
        pokemon.types[0].type.name.includes(type))
    ).filter(pokemon => pokemon.name.includes(input_search)
    )



    if (favourites) {
      currentList.filter(pokemon => this.auth.currentUserValue.preferences.indexOf(pokemon.id) !== -1);
      console.log(currentList);
    }


    return of(sortBy(order, currentList))

  }
}

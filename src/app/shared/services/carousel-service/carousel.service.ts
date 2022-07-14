import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { PokemonService } from "src/app/core/services/pokemon/pokemon.service";
import { Pokemon } from "src/app/model/pokemon/pokemon.model";
import { FilteredListPipe } from "src/app/shared//pipes/filtered-list-pipe.pipe";

@Injectable({ providedIn: 'root' })

export class CarouselService {
    filteredList: Pokemon[];
    currentIndex = new BehaviorSubject<number>(0)
    index$: Observable<number>;

    constructor() {
        this.index$ = this.currentIndex.asObservable()
    }


    get currentIndexValue() {
        return this.currentIndex.value;
    }

    updateCurrentIndex(param: number) {
        return this.currentIndex.next(param)
    }
    getCaroLength(pokemonSrv: PokemonService, auth: AuthService) {
        let filteredListPipe = new FilteredListPipe(pokemonSrv, auth)
        filteredListPipe.transform(pokemonSrv.currentListValue).subscribe(list => this.filteredList = list)
        return this.filteredList.length;
    }

}

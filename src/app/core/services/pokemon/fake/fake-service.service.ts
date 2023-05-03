import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, Subject } from "rxjs";
import { Pokemon } from "src/app/model/pokemon/pokemon.model";
import { PokemonList } from "src/app/model/pokemonList/pokemon-list.model";

@Injectable({ providedIn: 'root' })


export class FakeService {
    loading: boolean;
    apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=';
    pokemonListSubject: Subject<Pokemon[]> = new Subject<Pokemon[]>();
    currentListSubject: Subject<Pokemon[]> = new Subject<Pokemon[]>();

    constructor(private http: HttpClient) { }

    getPokemonListSubject(): Subject<Pokemon[]> {
        return this.pokemonListSubject;
    }
    getCurrentListSubject(): Subject<Pokemon[]> {
        return this.currentListSubject;
    }

    loadPokemonList(num: number) {
        this.loading = true;
        this.loadPokemonApi(num).subscribe(list => forkJoin(list.results.map(obj =>
            this.http.get<Pokemon>(obj.url))) // Passing as source for forkJoin an array as suggested
            .subscribe(val => {
                this.pokemonListSubject.next(val)
                this.currentListSubject.next(val)
                this.loading = false;
            }))

    }

    loadPokemonApi(limit: number): Observable<PokemonList> {
        return this.http.get<PokemonList>(`${this.apiUrl}${limit}`)
    }
}

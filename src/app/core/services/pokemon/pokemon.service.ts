import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, } from "rxjs";
import { Pokemon } from "src/app/model/pokemon/pokemon.model";
import { PokemonList } from "src/app/model/pokemonList/pokemon-list.model.js";
import { AuthService } from "../auth/auth.service";







@Injectable({ providedIn: 'root' })

export class PokemonService {
    //apis
    apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=';
    singlePokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    //component initialization 
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    //pokemonList
    pokemonList: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
    public currentList: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
    //sorting options



    //(Getter) 
    public get currentListValue() {
        return this.currentList.value
    }
    public get pokemontListValue() {
        return this.pokemonList.value
    }
    public get loadingValue() {
        return this.isLoading.value
    }

    constructor(private http: HttpClient, private auth: AuthService) {
        this.getPokemon(30);

    }




    getPokemon(numberOfPokemon: number) {
        this.isLoading.next(true)


        this.http.get<PokemonList>(`${this.apiUrl}${numberOfPokemon}`).pipe(map(
            (resp: PokemonList) => forkJoin(resp.results.map(
                (obj: { name: string, url: string }) => this.http.get<Pokemon>(obj.url)
            )).subscribe(val => {
                this.currentList.next(val);
                this.pokemonList.next(val);
                this.isLoading.next(false)
            })

        )
        ).subscribe();
    }
    currentListSetter(value: Pokemon[]) {
        this.currentList.next(value)
    }



}

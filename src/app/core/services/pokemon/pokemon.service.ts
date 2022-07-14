import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, } from "rxjs";
import { Pokemon } from "src/app/model/pokemon/pokemon.model";
import { PokemonList } from "src/app/model/pokemonList/pokemon-list.model.js";







@Injectable({ providedIn: 'root' })

export class PokemonService {
    //apis
    apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=';
    singlePokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    //component initialization 
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    //pokemonList
    currentList: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
    //sorting options
    order: BehaviorSubject<string> = new BehaviorSubject("id");
    inputSearchString: BehaviorSubject<string> = new BehaviorSubject("");
    pokeTypeFilter: BehaviorSubject<unknown[]> = new BehaviorSubject([]);
    favControlInputChecked: BehaviorSubject<boolean> = new BehaviorSubject(false)

    //Getter & Setter 
    public get inputSearchStringValue() {
        return this.inputSearchString.value
    }
    public get pokeTypeFilterValue() {
        return this.pokeTypeFilter.value
    }
    public get orderValue() {
        return this.order.value
    }
    public get currentListValue() {
        return this.currentList.value
    }
    public get loadingValue() {
        return this.isLoading.value
    }
    public get favControlInputValue() {
        return this.favControlInputChecked.value
    }

    togglefavControlInputValue() {
        let value: boolean;
        this.favControlInputValue === false
            ? value = true
            : value = false
        return this.favControlInputChecked.next(value)
    }

    public currentListsetter(list: Pokemon[]) {
        return this.currentList.next(list)
    }

    setOrder(option: string) {
        this.order.next(option)
    }
    setSearchString(option: string) {
        this.inputSearchString.next(option)
    }


    constructor(private http: HttpClient) {
    }


    getPokemon(numberOfPokemon: number) {
        this.isLoading.next(true)

        this.http.get<PokemonList>(`${this.apiUrl}${numberOfPokemon}`).pipe(map(
            (resp) => forkJoin(resp.results.map(
                (obj: { name: string, url: string }) => this.http.get<Pokemon>(obj.url)
            )).subscribe(val => {
                this.currentList.next(val);
                this.isLoading.next(false)
            })

        )
        ).subscribe();
    }




}

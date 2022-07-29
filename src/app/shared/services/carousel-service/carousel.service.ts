import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { Pokemon } from "src/app/model/pokemon/pokemon.model";

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


}

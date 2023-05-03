import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({ providedIn: 'root' })

export class CarouselService {
    currentIndexSubject: Subject<number> = new Subject<number>()
    constructor() {
        this.currentIndexSubject.next(0)
    }


    getcurrentIndexSubject() {
        return this.currentIndexSubject;
    }




}

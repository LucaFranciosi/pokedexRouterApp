import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Injectable({ providedIn: 'root' })

export class Preferences {
    isFavourite: BehaviorSubject<boolean>;
    isFav$: Observable<boolean>;

    constructor(public auth: AuthService) {
        this.isFavourite = new BehaviorSubject<boolean>(false);
        this.isFav$ = this.isFavourite.asObservable()
    }

    get isFav() {
        return this.isFavourite.value
    }

    pushPreferences(id: number) {
        let preferences: number[] = this.auth.currentUserValue.preferences;
        if (this.isFavourite) {
            preferences = [...preferences.splice(0, preferences.indexOf(id))];
            this.isFavourite.next(false)
        }
        else {
            preferences = [...preferences, id];
            this.isFavourite.next(true);
            console.log(preferences)
        };
        this.auth.updateUser({ ...this.auth.currentUserValue, preferences });
        console.log(this.auth.currentUserValue.preferences)
        return this.auth.postFavourite(this.auth.currentUserValue)

    }
}

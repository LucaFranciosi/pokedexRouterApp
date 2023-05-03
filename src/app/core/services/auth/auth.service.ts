import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "src/app/model/user/user.model";




const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
}
@Injectable({ providedIn: 'root' })

export class AuthService {
    public user: User;
    public userSubject: Subject<User> = new Subject<User>()

    constructor(private http: HttpClient, private router: Router) {
        this.userSubject.subscribe(user => this.user = user);
    }


    getUserSubject(): Subject<User> {
        return this.userSubject;
    }

    login({ email, password }) {
        return this.http.post<User>('http://localhost:4001/login', { email, password }, httpOptions)
            .subscribe(user => {
                localStorage.setItem('token', user.token)
                this.userSubject.next({ ...user, preferences: [] }) /// VEDIAMO SE QUI STA IL PROBLEMA.
                this.router.navigate(['home'])
            })

    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['login']);
    }



    register({ firstName, lastName, email, password }) {

        this.http.post<User>("http://localhost:4001/register", { firstName, lastName, email, password }, httpOptions)
            .subscribe(user => {
                this.userSubject.next(user);
                localStorage.setItem('token', user.token);

            });
        this.router.navigate([''])

    }




    postFavourite(data: User) {
        this.http.post<number[]>('http://localhost:4001/addPreferences', { firstName: data.first_name, preferences: data.preferences }, httpOptions).subscribe({
            error: (e) => console.error('something is wrong in DB, but it works just fine!', e)
        })
    }


    getFavourite() {
        this.http.get<number[]>(`http://localhost:4001/preferences?firstName=${this.user.first_name}`).subscribe(
            fav => {
                this.user.preferences = fav;
                this.userSubject.next({ ...this.user, preferences: fav });
            }
        )
    }


}

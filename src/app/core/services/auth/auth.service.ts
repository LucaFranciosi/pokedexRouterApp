import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/model/user/user.model";




const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
}
@Injectable({ providedIn: 'root' })

export class AuthService {

    public currentUserSubject: BehaviorSubject<User>
    public currentUser$: Observable<User>
    error: any



    constructor(
        private http: HttpClient,
        private router: Router,

    ) {
        this.currentUserSubject = new BehaviorSubject<User>(null)
        this.currentUser$ = this.currentUserSubject.asObservable()

    }

    // function to get the currentUserValue as an object of type User as a return. 
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    updateUser(user: User) {
        this.currentUserSubject.next(user);
    }


    login({ email, password }) {
        return this.http.post<User>('http://localhost:4001/login', { email, password }, httpOptions)
            .subscribe(user => {

                this.updateUser({ ...user/* , ['preferences']: []  */ })
                localStorage.setItem('token', user.token)
                this.router.navigate(['home'])
            })

    }

    logout() {
        localStorage.removeItem('token')
        this.updateUser(null)
        this.router.navigate(['login'])
    }



    register({ firstName, lastName, email, password }) {

        this.http.post<User>("http://localhost:4001/register", { firstName, lastName, email, password }, httpOptions)
            .subscribe(user => {

                this.updateUser(user)
                localStorage.setItem('token', user.token)

            })
        this.router.navigate([''])

    }

    isLogged(): boolean {
        let isAuth: boolean;
        this.currentUserValue !== null
            ? isAuth = true
            : isAuth = false
        return isAuth
    }


    postFavourite(data: User) {
        this.http.post<Array<number>>('http://localhost:4001/addPreferences', { firstName: data.first_name, preferences: data.preferences }, httpOptions).subscribe({
            next: (user) => {
                console.log('res', user)

            },
            error: (e) => console.error('still can t get why i got this error here!', e)
        }



        )
    }


    getFavourite(user: User) {
        this.http.get<Array<number>>(`http://localhost:4001/preferences?firstName=${user.first_name}`).subscribe(
            fav => {
                this.currentUserValue.preferences = fav;
                this.updateUser(this.currentUserValue);
                console.log(this.currentUserValue)
            }
        )
    }


}

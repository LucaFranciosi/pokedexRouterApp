
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({ providedIn: 'root' })


export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) { }

    canActivate(): boolean {
        const isAuth = this.auth.user !== undefined
        if (!isAuth) {
            this.router.navigate(['login'])
        }
        return isAuth;
    }
}
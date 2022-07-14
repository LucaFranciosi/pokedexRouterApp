import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user.model';
import { AuthService } from '../auth.service';

const token = localStorage.getItem('token') || null;

const httpOptions = {
  headers: new HttpHeaders({ 'x-access-token': token })
}



@Injectable({
  providedIn: 'root'
})

// ERROR : se c'è il token fa la chiamata, altrimenti no!
export class MyInitService {
  data: User;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  initCheck() {
    return new Observable((subscriber) => {
      try {
        this.http.get<User>('http://localhost:4001/welcome', httpOptions).subscribe(
          res => {
            this.data = { ...res, token }
            subscriber.next(this.data)//DEBUGGARE
            this.authService.updateUser(this.data)
            this.router.navigate([""])
          })
      }
      catch (e) {
        subscriber.error(e)
      }

      return subscriber.complete()


    })
  }
}


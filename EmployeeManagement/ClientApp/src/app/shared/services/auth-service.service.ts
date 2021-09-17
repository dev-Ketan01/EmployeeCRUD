import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let authReq = {
      userName: username,
      password: password
    }
    return this.http.post<any>(`${environment.baseUrl}users/authenticate`, authReq)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user.message == "Success") {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.reload()

  }
}

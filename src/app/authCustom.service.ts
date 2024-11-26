import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './user';

export interface AuthStatus {
  isAuthenticated: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthCustomService {

  readonly currentUser$ : BehaviorSubject<User> ;
  readonly token$ : BehaviorSubject<string> ;
  
  constructor(private http: HttpClient) {

    this.currentUser$ = new BehaviorSubject<User> 
    (JSON.parse(localStorage.getItem('user') || '{}'));

    this.token$ = new BehaviorSubject<string>(localStorage.getItem('token') || '')
  }

  private Uri = `${environment.apiUri}`;

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.Uri}/auth`, { email: email, password: password })
      .pipe(
        map((value) => {
          localStorage.setItem('token', value.accessToken);
          // still need to parse the name and user details
          // from the token
          localStorage.setItem('user', JSON.stringify({name : 'name'}));
          return;
        })
      );
  }


  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

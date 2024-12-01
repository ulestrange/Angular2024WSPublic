import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './user';


@Injectable({
  providedIn: 'root',
})
export class AuthCustomService {

  readonly currentUser$ : BehaviorSubject<User | null> ;
  readonly token$ : BehaviorSubject<string> ;
  readonly isAuthenticated$ : BehaviorSubject<boolean>;
  
  constructor(private http: HttpClient) {

    this.currentUser$ = new BehaviorSubject<User | null> 
    (JSON.parse(localStorage.getItem('user') || '{}'));

    this.token$ = new BehaviorSubject<string>(localStorage.getItem('token') || '')
    
    if(this.token$.value != "") {
       this.isAuthenticated$ = new BehaviorSubject<boolean>(true)
    }
    else{
      this.isAuthenticated$ = new BehaviorSubject<boolean>(false)
    }
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
          this.currentUser$.next({name: 'name'} as User);
          this.token$.next(value.accessToken);
          this.isAuthenticated$.next(true);
          return;
        })
      );
  }


  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser$.next(null);
    this.token$.next('');
    this.isAuthenticated$.next(false);
  }
}

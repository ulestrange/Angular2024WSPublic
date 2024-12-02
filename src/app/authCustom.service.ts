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
 // readonly token$ : BehaviorSubject<string> ;
  readonly isAuthenticated$ : BehaviorSubject<boolean>;
  
  constructor(private http: HttpClient) {

    this.currentUser$ = new BehaviorSubject<User | null> 
    (JSON.parse(localStorage.getItem('user') || '{}'));

    const token = localStorage.getItem('token') || '';

 //   this.token$ = new BehaviorSubject<string>(localStorage.getItem('token') || '')
    
   if (token != "") {
    console.log(token)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expires = payload.exp *1000
    if (expires > Date.now()){
      this.isAuthenticated$ = new BehaviorSubject<boolean>(true)
      this.startAuthenticateTimer(expires);
    }
    else{
       this.isAuthenticated$ = new BehaviorSubject<boolean>(false) 
    }
  }
  else{
      this.isAuthenticated$ = new BehaviorSubject<boolean>(false)
    }
  }

  private Uri = `${environment.apiUri}`;
  
  private authenticateTimeout?: any;



  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.Uri}/auth`, { email: email, password: password })
      .pipe(
        map((body) => {
          const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
          const expires = payload.exp *1000
          localStorage.setItem('token', body.accessToken);
          localStorage.setItem('user', JSON.stringify(payload));
          this.currentUser$.next(payload as User);
        //  this.token$.next(body.accessToken);
          this.isAuthenticated$.next(true);
          this.startAuthenticateTimer(expires);
          return;
        })
      );
  }


  private startAuthenticateTimer(expires: number) {

    // set a timeout to re-authenticate with the api one minute before the token expires

    const timeout = expires - Date.now() - (60 * 1000);

    this.authenticateTimeout = setTimeout(() => {
      if (this.isAuthenticated$.value){
      this.getNewAccessToken().subscribe();
      }
    }, timeout);
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser$.next(null);
 //   this.token$.next('');
    this.isAuthenticated$.next(false);
  }

  // this hasn't been implemented on the server yet 
  // we will be logged out instead.

  private getNewAccessToken(): Observable<any> {
      return this.http.post<any>(`${this.Uri}/auth/refresh`, {email : this.currentUser$.value?.email},
        { withCredentials: true })
      }



}
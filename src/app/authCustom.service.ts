import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
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
      .post<any>(`${this.Uri}/auth`, { email: email, password: password },
        { withCredentials: true }
      )
      .pipe(
        map((body) => {
          const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
          const expires = new Date(payload.exp *1000)
          localStorage.setItem('token', body.accessToken);
          localStorage.setItem('user', JSON.stringify(payload));
          this.currentUser$.next(payload as User);
          this.token$.next(body.accessToken);
          this.isAuthenticated$.next(true);
          console.log('here before timer')
          this.startAuthenticateTimer(expires);
          return;
        })
      );
  }

// public logout() : Observable<any> {
//   return 
//     this.http.post<any>(`${this.Uri}/auth`, {}).pipe();
// } 




  public logout(): Observable<any> {
    console.log('logging out');
    return this.http
    .get<any>(`${this.Uri}/auth/logout` , { withCredentials: true })
      .pipe(
        map((body) => {
          console.log('answer received')
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          console.log('in logout');
          this.currentUser$.next(null);
          this.token$.next('');
          this.isAuthenticated$.next(false);
        })
      );
  }


  private authenticateTimeout?: any;

  private startAuthenticateTimer(expires: Date) {

    // set a timeout to re-authenticate with the api one minute before the token expires

    const timeout = expires.getTime() - Date.now() - (60 * 1000);

    this.authenticateTimeout = setTimeout(() => {
      this.getNewAccessToken().subscribe();
       this.logout();
    }, timeout);
  }

  private getNewAccessToken(): Observable<any> {

    // note the withCredentials below means that cookies will be sent to the server
    // you must completly restart the angular application after adding this or it won;t
    // take effect.

    return this.http.post<any>(`${this.Uri}/auth/refresh`, {email : this.currentUser$.value?.email},
      { withCredentials: true }).
      pipe(
      map((body) => {
        const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
        const expires = new Date(payload.exp *1000)
        localStorage.setItem('token', body.accessToken);
        localStorage.setItem('user', JSON.stringify(payload));
        this.currentUser$.next(payload as User);
        this.token$.next(body.accessToken);
        this.isAuthenticated$.next(true);
        this.startAuthenticateTimer(expires);
      }))
  }

}

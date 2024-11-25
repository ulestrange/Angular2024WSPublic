import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';


export interface AuthStatus {
  isAuthenticated: boolean
  userId: string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http : HttpClient) { }

   private Uri = `${environment.apiUri}`

  public login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.Uri}/auth`, { email: email, password: password }).
    pipe(
      map ((value) => {
        localStorage.setItem("token", value.accessToken);
        return 
      })
    )
  }
}

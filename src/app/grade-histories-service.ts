import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeHistory } from './grade-history';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GradeHistoriesService {



  private gradeHistoryUri = `${environment.apiUri}/gradehistories`

  constructor(private http: HttpClient) {}

  public getGradeHistories(): Observable<GradeHistory[]> {
    console.log('get grade Histories called');

    return this.http.get<GradeHistory[]>(this.gradeHistoryUri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  };



  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

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

    /// takes an id and sends a get request for that individual resource. 

  getGradeHistory(id: string): Observable<GradeHistory> {

    let uri = `${this.gradeHistoryUri}/${id}`
    
   return this.http.get<GradeHistory>(uri)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateGradeHistory(id: string, gradeHistory: GradeHistory): Observable<GradeHistory> {
    console.log('subscribing to update/' + id);
    let uri = `${this.gradeHistoryUri}/${id}`
    return this.http.put<GradeHistory>(uri, gradeHistory)
      .pipe(
        catchError(this.handleError)
      )
  }


  deleteGradeHistory(id: string) {
  let uri = `${this.gradeHistoryUri}/${id}`
  return this.http.delete<GradeHistory>(uri)
    .pipe(
      catchError(this.handleError)
    )
}
  
    /** adapted from https://angular.io/guide/http-send-data-to-server */
  
  addGradeHistory(gradeHistory: GradeHistory): Observable<GradeHistory> {
    return this.http.post<GradeHistory>(this.gradeHistoryUri, gradeHistory)
      .pipe(
        catchError(this.handleError)
      );
  }
  
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

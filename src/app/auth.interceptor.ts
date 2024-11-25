import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router'

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {


  const apiUri = `${environment.apiUri}`
  const jwt = localStorage.getItem('token');
  const router = inject(Router)

  // we don't want to attach our token to a request to any other api

  if (req.url.startsWith(apiUri)) {
    const authRequest = req.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })

    return next(authRequest).pipe(
      catchError((err) => {
        console.log('not authorised to send request')
            {
              router.navigate(['/login'], {       
          })
        }
        return throwError(() => err)
      })
    )
  } else {
  return next(req);
  }
};

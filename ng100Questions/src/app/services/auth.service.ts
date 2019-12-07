import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'http://localhost:8050/'; // development
  private baseUrl = '/apps/OneHundredQuestions/'; // production

  logoutSuccess: boolean;

  constructor(private http: HttpClient) { }

  login(username, password) {
    const credentials = this.generateBasicAuthCredentials(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    // create request to authenticate credentials
    return this.http
      .get(this.baseUrl + 'authenticate', httpOptions)
      .pipe(
        tap((res) => {
          localStorage.setItem('credentials' , credentials);
          localStorage.setItem('username' , username);
          window.location.reload();
          return res;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError('AuthService.login(): Error logging in.');
        })
        );
  }

  register(user) {
    // create request to register a new account
    return this.http.post(this.baseUrl + 'register', user)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.register(): error registering user.');
      })
    );
  }

  logout() {
    try {
      localStorage.removeItem('credentials');
      localStorage.removeItem('username');
      this.logoutSuccess = true;
    } catch (error) {
      console.error('logout failure');
    }
  }

  checkLogin() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(username, password) {
    return btoa(`${username}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem('credentials');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}

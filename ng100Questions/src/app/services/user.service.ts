import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8050/api/'; // development
  // private baseUrl = '/OneHundredQuestions/api/users/'; // production

  private credentials = this.auth.getCredentials();
  loggedIn = this.auth.checkLogin();
  constructor(private http: HttpClient, private auth: AuthService) {}


  index() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<User[]>(this.baseUrl + 'users/', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts index error');
      })
    );
  }

  showByUsername(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<User>(this.baseUrl + 'user/' + username, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError('showByUsername failed');
        })
      );
  }

  showUserById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts showById error');
      })
    );
  }

  updateUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<User>(this.baseUrl + 'users/' + user.id, user, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts update error');
      })
    );
  }

  deleteUser(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.delete(this.baseUrl + 'users/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts delete error');
      })
    );
  }
}

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8050/api/users/'; // development
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
    return this.http.get<User[]>(this.baseUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts index error');
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
    return this.http.get<User>(this.baseUrl + id, httpOptions).pipe(
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
    return this.http.put<User>(this.baseUrl + user.id, user, httpOptions).pipe(
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
    return this.http.delete(this.baseUrl + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts delete error');
      })
    );
  }
}

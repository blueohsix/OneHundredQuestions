import { environment } from './../../environments/environment';
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

  private append = 'api/';

  loggedIn = this.auth.checkLogin();
  constructor(private http: HttpClient, private auth: AuthService) {}


  index() {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<User[]>(environment.baseUrl + this.append + 'users/', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts index error');
      })
      );
    }

    showByUsername(username: string) {
      const credentials = this.auth.getCredentials();
      const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
      return this.http.get<User>(environment.baseUrl + this.append + 'user/' + username, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError('showByUsername failed');
        })
        );
      }

      showUserById(id: number) {
        const credentials = this.auth.getCredentials();
        const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
        return this.http.get<User>(environment.baseUrl + this.append + 'users/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts showById error');
      })
    );
  }

  updateUser(user: User) {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<User>(environment.baseUrl + this.append + 'users/' + user.id, user, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts update error');
      })
    );
  }

  deleteUser(id: number) {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.delete(environment.baseUrl + this.append + 'users/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('user.service.ts delete error');
      })
    );
  }
}

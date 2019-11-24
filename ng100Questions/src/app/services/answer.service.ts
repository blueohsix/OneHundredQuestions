import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Answer } from '../models/answer';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private baseUrl = 'http://localhost:8050/api/'; // development
  // private baseUrl = '/OneHundredQuestions/api/'; // production
  private credentials = this.auth.getCredentials();
  loggedIn = this.auth.checkLogin();
  constructor(private http: HttpClient, private auth: AuthService) { }

  index() {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Answer[]>(this.baseUrl + 'answers', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('answer.service.ts index error');
      })
    );
  }

  update(answer: Answer) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${this.credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put(this.baseUrl + answer.id, answer, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('answer.service.ts update error');
      })
    );
  }
}

import { environment } from './../../environments/environment';
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

  private append = 'api/';

  loggedIn = this.auth.checkLogin();
  constructor(private http: HttpClient, private auth: AuthService) { }

  index() {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Answer[]>(environment.baseUrl + this.append + 'answers', httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('answer.service.ts index error');
      })
    );
  }

  answersByUserId(uid: number) {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Answer[]>(environment.baseUrl + this.append + 'answer/' + uid, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('answersByUserId() error');
      })
    );
  }

  update(answer: Answer, aid: number) {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put(environment.baseUrl + this.append + 'answer/' +  aid, answer, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('answer.service.ts update error');
      })
    );
  }
  create(answer: Answer) {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post(environment.baseUrl + this.append + 'answer/', answer, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('answer.service.ts create error');
      })
    );
  }
}

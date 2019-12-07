import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // private getAllUrl = 'http://localhost:8050/api/questions/'; // developmenet
  // private getOneUrl = 'http://localhost:8050/api/question/'; // development
  private getAllUrl = '/apps/OneHundredQuestions/api/questions/'; // production
  private getOneUrl = '/apps/OneHundredQuestions/api/question/'; // production

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
    return this.http.get<Question[]>(this.getAllUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('question.service.ts index error');
      })
    );

  }

  questionById(question: Question) {
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get(this.getOneUrl + question.id, httpOptions ).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('question.service.ts update error');
      })
    );
  }
}

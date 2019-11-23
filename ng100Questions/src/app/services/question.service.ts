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

  private geturl = 'http://localhost:8050/api/questions/'; // developmenet
  private updateurl = 'http://localhost:8050/api/question/'; // development
  // private geturl = '/OneHundredQuestions/api/questions/'; // production
  // private updateurl = '/OneHundredQuestions/api/question/'; // production

  constructor(private http: HttpClient) {}

  index() {
    return this.http.get<Question[]>(this.geturl).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('question.service.ts index error');
      })
    );

  }

  update(question: Question) {
    console.log(question);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.updateurl + question.id, question, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('question.service.ts update error');
      })
    );
  }
}

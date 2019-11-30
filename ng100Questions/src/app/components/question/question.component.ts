import { Answer } from './../../models/answer';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { QuestionService } from './../../services/question.service';
import { Question } from './../../models/question';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AnswerService } from 'src/app/services/answer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  player1Answers: Answer[] = [];
  player2Answers: Answer[] = [];
  player1: User;
  player2: User;
  fullyLoaded: boolean;
  selectedAnswer: Answer;
  editedAnswer: string;

  constructor(
    private questionService: QuestionService,
    private auth: AuthService,
    private userService: UserService,
    private answerService: AnswerService
  ) {}

  ngOnInit() {
    this.reload();
  }

  checkLogin() {
    if (!this.auth.checkLogin()) {
      this.player1 = null;
      this.player2 = null;
      this.player1Answers = null;
      this.player2Answers = null;
      this.fullyLoaded = false;
      console.log('everything successfully nulled');
    }
    return this.auth.checkLogin();
  }

  reload() {
    if (this.checkLogin()) {
      this.questionService.index().subscribe(
        lifeIsGood => {
          this.questions = lifeIsGood;
          this.getNames();
        },
        whenThingsGoBad => {
          console.error('error in reload()');
        }
      );
    }
  }

  getNames() {
    if (this.checkLogin()) {
      this.userService.showByUsername(this.auth.getUsername()).subscribe(
        lifeIsGood => {
          this.player1 = lifeIsGood;
          if (this.player1.associateUsername) {
            this.getAssociateUser();
          } else {
            this.fullyLoaded = true;
          }
          this.getAnswers(this.player1.id);
        },
        whenThingsGoBad => {
          console.error('error in player1 getNames()');
        }
      );
    }
  }

  getAssociateUser() {
    this.userService.showByUsername(this.player1.associateUsername).subscribe(
      lifeIsGood => {
        this.player2 = lifeIsGood;
        this.getAssociateAnswers(this.player2.id);
      },
      whenThingsGoBad => {
        console.error('error in player1 getNames()');
      }
    );
  }

  getAnswers(uid: number) {
    this.answerService.answersByUserId(uid).subscribe(
      lifeIsGood => {
        this.player1Answers = lifeIsGood;
        if (!this.player1.associateUsername) {
          this.fullyLoaded = true;
        }
      },
      whenThingsGoBad => {
        console.error('error in getAnswers()');
      }
    );
  }

  getAssociateAnswers(uid: number) {
    this.answerService.answersByUserId(uid).subscribe(
      lifeIsGood => {
        this.player2Answers = lifeIsGood;
        this.fullyLoaded = true;
      },
      whenThingsGoBad => {
        console.error('error in getAssociateAnswers()');
      }
    );
  }

  saveAnswer(form: NgForm, qid: number) {
   console.log(form.value);
   console.log('questionId: ' +  qid + '\n player1 id: ' + this.player1.id);
  }
}

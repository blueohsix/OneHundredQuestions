import { Answer } from './../../models/answer';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { QuestionService } from './../../services/question.service';
import { Question } from './../../models/question';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AnswerService } from 'src/app/services/answer.service';

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
          console.log(this.player1);
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
        console.log(this.player2);
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
        console.log(this.player1Answers);
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
        console.log(this.player2Answers);
        this.fullyLoaded = true;
      },
      whenThingsGoBad => {
        console.error('error in getAssociateAnswers()');
      }
    );
  }
  getAppropriateAnswer(qid: number, playerId: number): Answer {
    const playerAnswers =
      playerId === 1 ? this.player1Answers : this.player2Answers;
    let selectedAnswer: Answer = null;
    selectedAnswer = playerAnswers.find(a => a.question.id === qid);

    if (typeof selectedAnswer === undefined) {
      selectedAnswer.id = 0;
      selectedAnswer.answer = '';
      selectedAnswer.user.id = 0;
      selectedAnswer.user.name = '';
      selectedAnswer.question.id = 0;
      selectedAnswer.question.question = '';

    }
    return selectedAnswer;
  }

  nullEverything() {
    if (!this.checkLogin()) {
      this.player1 = null;
      this.player2 = null;
      this.player2.name = 'Please associate your Partner\'s username';
      // this.questions = null;
      this.player1Answers = null;
      this.player2Answers = null;
      this.fullyLoaded = false;
      console.log('everything successfully nulled');
    }
  }
}

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
  check = String.fromCodePoint(0x2705);

  constructor(
    private questionService: QuestionService,
    private auth: AuthService,
    private userService: UserService,
    private answerService: AnswerService
  ) {}

  ngOnInit() {
    this.reload();
  }

  expandPanel(id: string) {
    const panel = document.getElementById(id);
    if (panel.className.indexOf('w3-show') === -1) {
      panel.className += ' w3-show';
    } else {
      panel.className = panel.className.replace(' w3-show', '');
    }
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
            this.player2 = new User();
            this.player2.name = 'No Partner Linked';
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
        if (this.player2) {
          this.getAssociateAnswers(this.player2.id);
        } else {
          this.player2 = new User();
          this.player2.name = 'No Partner Linked';
          this.fullyLoaded = true;
        }
      },
      whenThingsGoBad => {
        console.error('error in getAssociateUser()');
      }
    );
  }

  getAnswers(uid: number) {
    this.answerService.answersByUserId(uid).subscribe(
      lifeIsGood => {
        this.player1Answers = lifeIsGood;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.questions.length; i++) {
          if (i < this.player1Answers.length) {
            if (this.player1Answers[i].answer) {
              // tslint:disable-next-line: max-line-length
              this.questions[this.player1Answers[i].question.id - 1].question =
                this.questions[this.player1Answers[i].question.id - 1]
                  .question +
                ' ' +
                this.check;
            }
          }
        }
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
  answered(qid: number) {
    try {
      const answer = this.player1Answers.find(a => a.question.id === qid)
        .answer;
      return true;
    } catch (error) {
      return false;
    }
  }

  safelyRetrieveAnswer(qid: number, uid: number) {
    let answer: string;
    const playerAnswers = uid === 1 ? this.player1Answers : this.player2Answers;
    try {
      answer = playerAnswers.find(a => a.question.id === qid).answer;
      return answer;
    } catch (error) {
      if (answer) {
        return answer;
      }
      if (uid === 2) {
        if (this.player2.name !== 'No Partner Linked') {
          return this.player2.name + ' has not answered this question yet.';
        }
        // tslint:disable-next-line: max-line-length
        return 'Add your partner\'s username to your profile. \nIf you feel you\'re seeing this in error, make sure your partner\'s account is active and your username has been added to their profile';
      }
      return '';
    }
  }

  saveAnswer(form: NgForm, qid: number) {
    if (form.value.answer) {
      let answer = this.player1Answers.find(a => a.question.id === qid);
      if (answer) {
        answer.answer = form.value.answer;
        answer.user = new User();
        answer.user.id = this.player1.id;
        this.answerService.update(answer, answer.id).subscribe(
          lifeIsGood => {
            console.log('answer updated successfully');
          },
          whenThingsGoBad => {
            console.error('error in saveAnswer()');
          }
        );
      }
      if (!answer) {
        answer = new Answer();
        answer.answer = form.value.answer;
        answer.question = new Question();
        answer.question.id = qid;
        answer.user = new User();
        answer.user.id = this.player1.id;
        console.log('new answer: ' + answer);
        this.answerService.create(answer).subscribe(
          lifeIsGood => {
            console.log('answer created and saved successfully');
            this.player1Answers.push(answer);
          },
          whenThingsGoBad => {
            console.error('error in saveAnswer()');
          }
        );
      }
    }
  }
}

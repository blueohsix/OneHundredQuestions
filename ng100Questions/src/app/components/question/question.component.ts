import { QuestionService } from './../../services/question.service';
import { Question } from './../../models/question';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  editedQuestion: Question = null;
  selected: Question = null;
  approved: boolean;
  approvalText: string ;
  answeredUserAnswerO: boolean;
  answeredUserAnswerX: boolean;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.reload();
  }
  editAnswer(question: Question) {
    this.selected = question;
    console.log(this.selected);
  }

  reload() {
    this.questionService.index().subscribe(
      lifeIsGood => {
        console.log(this.questions);

        this.questions = lifeIsGood;
      },
      whenThingsGoBad => {
        console.error('error in question.component.ts');
      }
    );
  }

  checkAnswered(question: Question) {
    if (question.userAnswerO !== '' && question.userAnswerX !== '') {
      return '<html><strong>:D     </strong><html>';
    } else {
      return '<html><strong>:(     </strong><html>';
    }
  }

  // (re)build components and services
}

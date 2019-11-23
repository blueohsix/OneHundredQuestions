import { Question } from './question';
import { User } from './user';

export class Answer {

  id: number;
  answer: string;
  question: Question;
  user: User;

  constructor(id?: number, answer?: string, question?: Question, user?: User) {
    this.id = id;
    this.answer = answer;
    this.question = question;
    this.user = user;
  }
}

export class Question {
  id: number;
  question: string;
  userAnswerO: string;
  userAnswerX: string;

  constructor(
    id?: number,
    question?: string,
    userAnswerO?: string,
    userAnswerX?: string
  ) {
    this.id = id;
    this.question = question;
    this.userAnswerO = userAnswerO;
    this.userAnswerX = userAnswerX;
  }
}

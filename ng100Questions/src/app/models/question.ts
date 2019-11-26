export class Question {
  id: number;
  question: string;

  constructor(
    id?: number,
    question?: string
  ) {
    this.id = id;
    this.question = question;
  }
}

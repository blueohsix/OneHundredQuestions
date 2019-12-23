import { Category } from './category';

export class Question {
  id: number;
  question: string;
  categories: Category;

  constructor(
    id?: number,
    question?: string,
    categories?: Category
  ) {
    this.id = id;
    this.question = question;
    this.categories = categories;
  }
}

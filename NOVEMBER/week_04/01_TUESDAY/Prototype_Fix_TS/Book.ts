export class Book {
  constructor(
    public title: string,
    public author: string,
    public reviews: string[]
  ) {}

  clone(): Book {
    return new Book(this.title, this.author, [...this.reviews]);
  }

  toString(): string {
    return `Book [title=${this.title}, author=${this.author}, reviews=${this.reviews}]`;
  }
}

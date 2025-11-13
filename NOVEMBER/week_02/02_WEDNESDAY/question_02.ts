class Book {
  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
  }
    display(): void {
        console.log(`Title: ${this.title}, Author: ${this.author}, Price: $${this.price}`);
    }
}

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 10.99);
book1.display();
const book2 = new Book("1984", "George Orwell", 8.99);
book2.display();
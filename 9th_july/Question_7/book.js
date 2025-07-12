
// constructor function creates Book object
export function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}


Book.prototype.getSummary = function () {
  return `${this.title} by ${this.author}, published in ${this.year}`;
};

// creating  book objects
export const books = [
  new Book("To Kill a Mockingbird", "Harper Lee", 1960),
  new Book("1984", "George Orwell", 1949),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
  new Book("The Hobbit", "J.R.R. Tolkien", 1937),
  new Book("Pride and Prejudice", "Jane Austen", 1813)
];

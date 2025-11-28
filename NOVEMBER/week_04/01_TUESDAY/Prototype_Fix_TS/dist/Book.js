"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    clone() {
        return new Book(this.title, this.author, [...this.reviews]);
    }
    toString() {
        return `Book [title=${this.title}, author=${this.author}, reviews=${this.reviews}]`;
    }
}
exports.Book = Book;
//# sourceMappingURL=Book.js.map
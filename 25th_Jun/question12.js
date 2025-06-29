const library = {
  books: [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
  ],

  // Add a new book only if it has all required properties
  addBook(book) {
    if (!book.title || !book.author || !book.year) {
      console.log("Book information is incomplete.");
      return;
    }
    this.books.push(book);
    console.log(`Book "${book.title}" added to the library.`);
  },

  // Find a book by its title
  findBookByTitle(title) {
    return this.books.find(book => book.title === title);
  },

  // Remove a book by its title
  removeBook(title) {
    const index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
      console.log(`Book "${title}" removed from the library.`);
    } else {
      console.log("Book not found.");
    }
  }
};

library.addBook({ title: "1984", author: "George Orwell", year: 1949 });

console.log(`Total books: ${library.books.length}`); // Should print 2
console.log("Find 'The Hobbit':", library.findBookByTitle("The Hobbit")); // Should return the book object
library.removeBook("The Hobbit");
console.log(`Total books after removal: ${library.books.length}`); // Should print 1

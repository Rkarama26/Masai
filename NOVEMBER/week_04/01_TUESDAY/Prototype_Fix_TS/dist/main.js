"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./Book");
const reviews = ["Great book!", "Highly recommended."];
const original = new Book_1.Book("The Great Gatsby", "F. Scott Fitzgerald", reviews);
const cloned = original.clone();
// Modify the cloned book's reviews
cloned.reviews.push("Awesome read!");
console.log("Original book: " + original.toString());
console.log("Cloned book: " + cloned.toString());
//# sourceMappingURL=main.js.map
import { Book } from "./Book";

const reviews = ["Great book!", "Highly recommended."];

const original = new Book("The Great Gatsby", "F. Scott Fitzgerald", reviews);

const cloned = original.clone();

// Modify the cloned book's reviews
cloned.reviews.push("Awesome read!");

console.log("Original book: " + original.toString());
console.log("Cloned book: " + cloned.toString());

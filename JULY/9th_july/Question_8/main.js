import { Book } from "./book.js";
import { Member, PremiumMember } from "./member.js";



const book1 = new Book("1984", "George Orwell")
const book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald")
const book3 = new Book("The Hobbit", "J.R.R. Tolkien")
const book4 = new Book("The Hobbit2", "J.R.R. Tolkien")
const book5 = new Book("The Hobbit3", "J.R.R. Tolkien")
const book6 = new Book("1984", "George Orwell")


let m1 = new Member("rohit");
// m1.borrow(book1)
// m1.borrow(book2)
// m1.borrow(book3)
// m1.borrow(book4)

let pm1 = new PremiumMember("vansh")
pm1.borrow(book1)
pm1.borrow(book2)
pm1.borrow(book3)
pm1.borrow(book4)
pm1.borrow(book5)
pm1.borrow(book5)
pm1.borrow(book6)
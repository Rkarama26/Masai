

export function Member(name, borrowedBook = []) {
    this.name = name;
    this.borrowedBook = borrowedBook;


}
// borrow method this will allow a member to borrow maximum 3 books
Member.prototype.borrow = function (book) {

    if (book.isAvailable) {
        if (this.borrowedBook.length < 3) {
            this.borrowedBook.push(book.title);
            book.isAvailable = false;
        }
        else {
            console.log("Can't borrow more than 3 books")
        }

    }
    else {
        console.log("Book already borrowed")
    }

}
// borrow method this will allow a member to borrow maximum 5 books
export function PremiumMember(name, borrowedBook = []) {
    // using call to bind this with parent.
    Member.call(this, name, borrowedBook);
    this.borrow = function (book) {
        if (book.isAvailable) {
            if (this.borrowedBook.length < 5) {
                this.borrowedBook.push(book.title);
                book.isAvailable = false;
            }
            else {
                console.log("Can't borrow more than 3 books")
            }

        }
        else {
            console.log("Book already borrowed")
        }
    }
}

PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

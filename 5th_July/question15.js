
function createBook(title, author){
return{
  title,
  author,
  details(){
    console.log(`Book ${title} writte by ${author}`)
  }
}
}

function createLibrary(){
  let storage = []
  return{
    addBook(book){
      storage.push(book);
      console.log(`Book title: ${book.title} added to library`)
    },
    
    remove(title){
      let index = storage.findIndex((book) => book.title === title);
      
      if(index !== -1){
        console.log(`Book title: ${title} removed form library`)
        storage.splice(index, 1)
      }else{
        console.log(`Book with title: ${title} not found`)
      }
    },
    
    detailsOfLibrary(){
      
      if(storage.length === 0){
        console.log("library is Empty")
      }
      else{
        console.log("library Collection")
        storage.forEach((book) => book.details())
      }
    }
  }
}


const book1 = createBook("Atomic habits", "James Clear")
const book2 = createBook("Rich dad poor dad", "Robert")
book1.details()
book2.details()

let library = createLibrary();
library.addBook(book1);
library.addBook(book2);

library.detailsOfLibrary();

library.remove("Atomic habits")
library.detailsOfLibrary();


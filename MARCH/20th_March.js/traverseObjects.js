

/*
Traverse Objects with for...in lop
*/

let book = { 
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    year: 1937,
};


function travers(obj){
    for(let key in obj){
        console.log(key+": "+obj[key])
    }
}
travers(book)
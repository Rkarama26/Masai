import { books } from './book.js';

// call getSummary() method for each book
const summaries = books.map(book => book.getSummary());
console.log(summaries);


// it will display on web page
summaries.forEach(summary => {
  const p = document.createElement('p');
  p.textContent = summary;
  document.body.appendChild(p);
});
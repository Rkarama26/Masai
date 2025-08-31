const BookDetails = ({ book }) => {
  return (
    <div>
      <h3 className="font-bold">{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Status: {book.read ? "Read ✅" : "Unread ❌"}</p>
    </div>
  );
};

export default BookDetails;

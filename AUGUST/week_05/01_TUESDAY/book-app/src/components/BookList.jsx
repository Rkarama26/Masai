import { useSelector, useDispatch } from "react-redux";
import { deleteBook, toggleRead } from "../redux/actions";
import BookDetails from "./BookDetails";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  // Apply filters
  const filteredBooks = books.filter((book) => {
    const matchAuthor = filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true;
    const matchGenre = filters.genre ? book.genre.toLowerCase().includes(filters.genre.toLowerCase()) : true;
    const matchStatus = filters.status === "all" ? true : (filters.status === "read" ? book.read : !book.read);
    return matchAuthor && matchGenre && matchStatus;
  });

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        filteredBooks.map((book) => (
          <div key={book.id} className="flex items-center justify-between p-2 mb-2 border rounded">
            <BookDetails book={book}/>
            <div>
              <button onClick={() => dispatch(toggleRead(book.id))} className="px-2 py-1 mr-2 text-white bg-green-500 rounded">
                {book.read ? "Mark Unread" : "Mark Read"}
              </button>
              <button onClick={() => dispatch(deleteBook(book.id))} className="px-2 py-1 text-white bg-red-500 rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;

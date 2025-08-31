import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, editBook } from "../redux/actions";

const BookForm = ({ existingBook, onClose }) => {
  const [title, setTitle] = useState(existingBook?.title || "");
  const [author, setAuthor] = useState(existingBook?.author || "");
  const [genre, setGenre] = useState(existingBook?.genre || "");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { id: existingBook?.id || Date.now(), title, author, genre, read: existingBook?.read || false };
    existingBook ? dispatch(editBook(book)) : dispatch(addBook(book));
    onClose && onClose();
    setTitle(""); setAuthor(""); setGenre("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 border rounded">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2 border"/>
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full p-2 mb-2 border"/>
      <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="w-full p-2 mb-2 border"/>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">{existingBook ? "Update" : "Add"} Book</button>
    </form>
  );
};

export default BookForm;

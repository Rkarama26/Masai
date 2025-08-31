import { useDispatch } from "react-redux";
import { setFilter } from "../redux/actions";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-4 mb-4 border rounded">
      <h2 className="mb-2 text-lg font-bold">Filter Books</h2>
      <input name="author" placeholder="Filter by Author" onChange={handleChange} className="w-full p-2 mb-2 border"/>
      <input name="genre" placeholder="Filter by Genre" onChange={handleChange} className="w-full p-2 mb-2 border"/>
      <select name="status" onChange={handleChange} className="w-full p-2 border">
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </div>
  );
};

export default Filter;

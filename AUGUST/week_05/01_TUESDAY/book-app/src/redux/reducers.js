import { combineReducers } from "redux";
import {
  ADD_BOOK,
  DELETE_BOOK,
  EDIT_BOOK,
  TOGGLE_READ,
  SET_FILTER
} from "./actions";

// Initial States
const initialBooks = [];
const initialFilter = { author: "", genre: "", status: "all" };

// Books Reducer
const booksReducer = (state = initialBooks, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, { ...action.payload, id: Date.now(), read: false }];
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case EDIT_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? { ...action.payload } : book
      );
    case TOGGLE_READ:
      return state.map((book) =>
        book.id === action.payload ? { ...book, read: !book.read } : book
      );
    default:
      return state;
  }
};

// Filter Reducer
const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  books: booksReducer,
  filters: filterReducer
});

export default rootReducer;

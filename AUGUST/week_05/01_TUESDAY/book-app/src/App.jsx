
import './App.css'
import BookForm from './components/BookForm'
import Filter from './components/Filter'
import BookList from './components/BookList'

function App() {

  return (
    <>
     <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Book Library 📚</h1>
      <BookForm />
      <Filter />
      <BookList />
    </div>
    </>
  )
}

export default App

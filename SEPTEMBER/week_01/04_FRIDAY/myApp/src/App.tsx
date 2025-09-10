import './App.css'
import Counter from './components/Counter'
import Greeting from './components/Greeting'

function App() {

  return (
    <>
      <div className='min-h-screen m-4 border-gray-600 border-5'>
        <Greeting name="alice" />

        <Counter />

      </div>
    </>
  )
}

export default App

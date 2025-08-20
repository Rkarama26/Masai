import { useState } from 'react';
import './App.css'
import Middle from './components/Middle'
import Display from './components/Display';
import ButtonOne from './components/ButtonOne';
import ButtonTwo from './components/ButtonTwo';

function App() {

  const message = "Hello from parent";
  //state uplifting - when 2 or more components need to share the same state,
  //  we put the state into their parent component
  const [count, setCount] = useState(0);
  return (
    <>


      <Display count={count} />
      <ButtonOne setCount={setCount} />
      <ButtonTwo setCount={setCount} />





      {/* prop drilling example */}
      {/* <h1>Parent Component</h1>
        <Middle message={message} />  */}



    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClickBtn from './component/ClickBtn'
import store from './redux/store'
import Counter from './component/Counter'


function App() {


  return (


    <>

      <h1>hello</h1>
      <ClickBtn />
      <Counter />

    </>
  )
}

export default App

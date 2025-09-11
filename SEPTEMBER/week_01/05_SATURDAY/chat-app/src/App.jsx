import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatWindow from './components/ChatWindow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h1>Gemini Chat</h1>
        <ChatWindow />
        <ChatInput />
      </div>
    </>
  )
}

export default App

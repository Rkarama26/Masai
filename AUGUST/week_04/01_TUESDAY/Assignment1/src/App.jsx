import { useEffect, useState } from 'react'
import './App.css'
import ThemeBox from './components/ThemeBox';

function App() {
  const [dark, setdark] = useState(() => {
    const theme = localStorage.getItem("theme")
    console.log(theme === "dark")
    return theme === "dark";
  });

  function toggleTheme() {
    setdark(!dark);
  }

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    const theme = localStorage.getItem("theme")
    console.log(theme === "dark")
  }, [dark])

  return (

    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-400
    ${dark ? "bg-black text-white" : "bg-white text-black"}`}>

      <p className='text-3xl font-bold mb-6'>Theme Toggle App</p>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg shadow-md bg-blue-500 text-white hover:bg-blue-500"
      >
        Switch to {dark ? "Light" : "Dark"}</button>

      <div className='flex space-x-4 '>
        <ThemeBox theme={dark ? "dark" : "light"} title="Box1" />
        <ThemeBox theme={dark ? "dark" : "light"} title="Box2" />
        <ThemeBox theme={dark ? "dark" : "light"} title="Box3" />

      </div>
    </div>

  )
}

export default App

import { useState } from 'react'
import './App.css'
import Home from './componenets/Home'
import About from './componenets/About'
import Contact from './componenets/Contact'
import { Route, Routes } from "react-router"
import Navbar from './componenets/Navbar'
import LandingPage from './componenets/LandingPage'
import Unknown from './componenets/Unknown'
import ProductList from './componenets/ProductList'
import ProductDetails from './componenets/ProductDetails'

function App() {
  const [count, setCount] = useState(0)

  // react router -- 
  /*
  BrowserRouter -> wrap whole app
  Routes - container (contains Route)
  Route - specify -> path , element(only used for conditionally display compoents)

  */

  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/products" element={<ProductList />} />

        {/* dynamic route */}
        <Route path="/product/id/:id" element={<ProductDetails />} />
        

        
        <Route path="/home" element={<Home />} />
        <Route path="/about/" element={<About />} />
        <Route path="/contact/" element={<Contact />} />
        

        <Route path='*' element={<Unknown />} />
      </Routes>
    </>
  )
}

export default App

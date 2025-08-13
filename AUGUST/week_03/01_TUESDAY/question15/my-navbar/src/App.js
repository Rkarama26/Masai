import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState("home");

  const renderSection = () => {
    switch (page) {
      case "home":
        return "🏠 This is home section";
      case "about":
        return "ℹ️ This is about section";
      case "contact":
        return "📞 This is contact section";
      default:
        return "🏠 This is home section";
    }
  };
  return (
    <div className="App">

    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <button className="text-white" onClick={() => setPage("home")}>Home</button>
        </li>
        <li>
          <button className="text-white" onClick={() => setPage("about")}>About</button>
        </li>
        <li>
          <button className="text-white" onClick={() => setPage("contact")}>Contact</button>
        </li>
      </ul>
    </nav>

    <div className="p-4">{renderSection()}</div>
    </div>
  );
}

export default App;

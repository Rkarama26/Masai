import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [data, setdata] = useState(null);
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

  async function fetchData() {
    setloading(true)
    setmessage("")

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const result = await response.json();
      setdata(result);
      console.log(result)
    } catch (error) {
      setmessage(`Error ${error}`)
    }
    finally {
      setloading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  // searchfilter
  const filteredData = data?.filter((user) => {
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  }) || []


  return (
    <>
      <h1 className="text-red-500 text-center text-2xl font-bold">Users</h1>
      <div className="p-6">

        <input
          type="text"
          placeholder='Search by Name'
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.val)}

        />


        {loading && <p className="mt-4 text-blue-500 font-bold">Loading...</p>}
        {message && <p className="mt-4 text-red-500 font-bold">{message}</p>}



        {/* Card List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {data &&
            data.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-300 rounded-xl p-4 bg-white hover:shadow-lg transition"
                >
                  <h1 className="text-lg font-semibold text-black">Company: {user.company.name}</h1>
                  <h2 className="text-md font-semibold text-gray-700">Name:{user.name}</h2>
                  <p className="text-gray-600 text-sm">✉️ {user.email}</p>
                  <p className="text-gray-600 text-sm">📞 {user.phone}</p>
                  <p className="text-gray-500 text-xs mt-2">🌐{user.website}</p>
                </div>

              ))}

        </div>
      </div>

    </>
  )
}

export default App

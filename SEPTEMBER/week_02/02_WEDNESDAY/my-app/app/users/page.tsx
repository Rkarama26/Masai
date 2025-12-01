import React from 'react'

interface User {
  id: number;
  name: string;
}


const UsersPage = async () => {

  // second parameter {cache: 'no-store'} to fetch to make it dynamic
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {cache: 'no-store'});
  const users: User[] = await res.json()


  return (
    <div>
      <div className='border li-5 mb-5 text-center'>
        <h3 className='text-red-500'>Note:-</h3>
        <ol className='text-left list-decimal px-5'>
          <li>Although for now on refreshing we are getting new time for each refresh</li>
          <li>But this page is static and will not change on refresh</li>
          <li>This is because the data is fetched at build time and not on each request</li>
          <li>because after the initial build, the output is cached and reused on subsequent requests</li>
        </ol>

      </div>
      <h1>Users</h1>
      <h3>{new Date().toLocaleTimeString()}</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

    </div>
  )
}

export default UsersPage

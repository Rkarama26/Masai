import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataComponent from './assets/DataComponent';
import DataProvider from './assets/DataProvider';


function App() {
  const [user, setuser] = useState("John");

  return (
    <>
      <h1>hello </h1>

      {/* step 3 - consuming data*/}
      <DataProvider>
        <DataComponent />
      </DataProvider>
    </>

  )
}























// const UserContext = createContext(); // 1. create context

// function App() {
//   const [user, setuser] = useState("John");

//   // 2. Provide Context
//   return (
//     <UserContext.Provider value={user}>
//       <Parent />
//     </UserContext.Provider>

//   )
// }

// it is an example of prop trailling where we are getting user prop 
// passed with numbers of layer
// --- so overcome this we will use context API 
// CPC -- CREATE , PROVIDE, CONSUME

// function Parent() {
//   return <Child />
// }

// function Child() {
//   return <GrandChild />
// }

// function GrandChild() {
//   const user = useContext(UserContext)
//   return <h1>Hello Grandchild {user}</h1>
// }

export default App


// step1: const UserContext = createContext();
// step2:  
/*
<UserContext.Provider>
       <Parent />
</UserContext.Provider>
*/

// step3: const context = useContext(UserContext);
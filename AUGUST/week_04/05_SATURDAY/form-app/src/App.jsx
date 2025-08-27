import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useReducer } from 'react'

const initialState = {
  email: "",
  password: "",
  submited: false,
}

function formReducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

function App() {

  const [state, dispatch] = useReducer(formReducer, initialState)


  function handleSubmit(e) {
    e.preventDefault();
    if (state.email || state.password) {
      dispatch({ type: 'submit' })
    }
  }

  return (
    <>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <form
          onSubmit={handleSubmit} >


          <div>
            <input type="text"
              name='email'
              placeholder='Enter Email'
              value={state.email}
              onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
            />
          </div>
          <div>
            <input type="password"
              name='password'
              placeholder='Enter Password'
              value={state.password}
              onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
            />

          </div>
          <button type='submit'>Submit</button>
          <button type='button' onClick={() => dispatch({ type: "reset" })}>Reset</button>
        </form>

        <div style={{ marginTop: "1rem" }}>
          {!state.submitted ? (
            <div>No details found</div>
          ) : (
            <div>
              <div>User Email: {state.email}</div>
              <div>User Password: {state.password}</div>
            </div>
          )}
        </div>


      </div>
    </>
  )
}

export default App

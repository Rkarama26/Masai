
import { Route, Router, Routes } from 'react-router'
import './App.css'
import { FormProvider } from './components/FormContext'
import FormPage from './components/FormPage'
import Summary from './components/Summary'

function App() {

  return (
    <>
      <FormProvider>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </FormProvider>
    </>
  )
}

export default App

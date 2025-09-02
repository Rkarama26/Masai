import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import ProfileCard from './ProfileCard'
import GridCards from './Grid-Cards'

function App() {

  return (
    <>

      <GridCards />
      <ProfileCard />

    </>
  )
}

export default App

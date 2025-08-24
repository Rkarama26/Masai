import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NotificationProvider } from './app_components/NotificationProvider '
import NotificationList from './app_components/NotificationList '
import { Box } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NotificationProvider>
        <Box p="4">
          <NotificationList />
        </Box>
      </NotificationProvider>
    </>
  )
}

export default App

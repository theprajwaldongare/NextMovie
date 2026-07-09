import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MovieTemplate from './components/MovieTemplate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <MovieTemplate/>
    </>
  )
}

export default App

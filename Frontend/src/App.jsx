import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import MovieTemplate from './components/MovieTemplate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Search/>
      <MovieTemplate/>
    </>
  )
}

export default App

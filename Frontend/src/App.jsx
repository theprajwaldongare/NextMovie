import { useContext, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import MovieTemplate from './components/MovieTemplate'
import { MovieProvider } from './context/MovieData'
import DisplayMovies from './components/DisplayMovies'

function App() {


  return (
    <>
      <Navbar />
      <MovieProvider>
        <div className="appCont">
          <Search />
          <DisplayMovies />
        </div>
      </MovieProvider>

      {/* <MovieTemplate/> */}
    </>
  )
}

export default App

import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieData'

const DisplayMovies = () => {
    const { movieData } = useContext(MovieContext)
    return (
        <>
            {/* {movieData} */}
        </>
    )
}

export default DisplayMovies
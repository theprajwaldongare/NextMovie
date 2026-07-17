import React, { useContext, useEffect, useRef } from 'react'
import { MovieContext } from '../context/MovieData'
import MovieTemplate from './MovieTemplate'

const DisplayMovies = () => {
    const { movieData, isLoading, movieNoSkeleton } = useContext(MovieContext)

    const displayRef = useRef(null)
    useEffect(() => {
        const hasMovies = movieData && movieData.length > 0;
        if ((isLoading || hasMovies) && displayRef.current) {
            displayRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isLoading, movieData])

    if (isLoading) {
        return (
            <div ref={displayRef} className="flex flex-wrap justify-center mt-10 w-full">
                {[...Array(movieNoSkeleton)].map((_, index) => (
                    <div
                        key={index}
                        className="m-4 w-60 h-90 bg-gray-800 rounded-2xl animate-pulse shadow-lg"
                    ></div>
                ))}
            </div>
        )
    }

    if (!movieData || movieData.length === 0) {
        return null;
    }

    return (
        <>
            <div ref={displayRef} className='flex flex-wrap items-center justify-center mt-10 w-full'>
                {movieData.map((movieItem, index) => {
                    return (
                        <MovieTemplate movieName={movieItem[0]} summary={movieItem[2]} poster={movieItem[3].poster} />
                        // <div key={index} className="movieCardTemp flex flex-col justify-center items-center w-80 mt-4">
                        //     <div className="mname">{movieItem[0]}</div>
                        //     <div className="mscore">{movieItem[1]}</div>
                        //     <div className="mdesc">{movieItem[2]}</div>
                        // </div>
                    )
                })}
            </div>
        </>
    )
}

export default DisplayMovies
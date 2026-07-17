import React,{createContext,useState} from "react"

export const MovieContext = createContext()

export const MovieProvider = ({children}) => {
    const [movieData, setMovieData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [movieNoSkeleton, setMovieNoSkeleton] = useState(5)
    return (
        <MovieContext.Provider value={{movieData, setMovieData,isLoading,setIsLoading,movieNoSkeleton, setMovieNoSkeleton}}>
            {children}
        </MovieContext.Provider>
    )
}
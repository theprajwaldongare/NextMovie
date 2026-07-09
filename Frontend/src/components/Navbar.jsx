import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className="main p-5 bg-gray-800 flex items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-9 h-9 bg-white rounded-full"></div>
                    <img src='movie.png' className='relative z-10 w-12 h-12 outline-none border-none' alt="logo" />
                </div>
                <div className="header font-mono text-2xl ml-5">NextMovie</div>
            </div>
        </>
    )
}

export default Navbar
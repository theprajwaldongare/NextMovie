import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className="main p-3 md:p-5 bg-gray-800 flex items-center">
                <div className="relative w-8 h-10 md:w-12 flex items-center justify-center">
                    <div className="absolute w-6 h-6 md:w-9 md:h-9 bg-white rounded-full"></div>
                    <img src='movie.png' className='relative z-10 w-8 h-8 md:w-12 md:h-12 outline-none border-none' alt="logo" />
                </div>
                <div className="header font-mono text-xl md:text-2xl ml-3 md:ml-5 text-white">NextMovie</div>
            </div>
        </>
    )
}

export default Navbar
import React from 'react'

const MovieTemplate = ({ movieName, summary, poster }) => {

    return (
        <>
            <div tabIndex={0} className="main m-4 w-60 relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg outline-none">
                <img src={poster || '../../public/templateImage.avif'} alt="movieImage" className='w-full h-90 object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105' />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="name mt-2 text-2xl font-bold text-white">{movieName}</div>

                    <div className="sname text-blue-400 text-xs font-semibold mt-2 tracking-widest uppercase">SUMMARY</div>
                    <div className="sval text-xs mt-1 text-gray-400 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                        {summary}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovieTemplate
import React from 'react'

const MovieTemplate = ({ movieName, summary, poster, genres = [] }) => {

    return (
        <>
            <div tabIndex={0} className="main m-4 w-60 relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg outline-none">
                <img src={poster || '../../public/templateImage.avif'} alt="movieImage" className='w-full h-90 object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105' />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="name mt-2 text-2xl font-bold text-white">{movieName}</div>

                    <div className="flex flex-wrap gap-1 mt-2 mb-1">

                        {genres?.slice(0, 3).map((genre, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-700/80 text-gray-200 text-[10px] font-medium rounded-full border border-gray-600 backdrop-blur-sm"
                            >
                                {genre.name || genre}
                            </span>
                        ))}
                    </div>
                    {/* <div className="flex items-center justify-between mt-1"> */}
                    <div className="sname text-blue-400 text-xs font-semibold mt-2 tracking-widest uppercase">SUMMARY</div>

                    {/* </div> */}
                    <div className="sval text-xs mt-1 text-gray-400 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                        {summary}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovieTemplate
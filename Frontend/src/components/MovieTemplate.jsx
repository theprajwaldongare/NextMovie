import React from 'react'

const MovieTemplate = () => {
    return (
        <>
            <div className="main m-10 w-60 relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                <img src="movieTemplate.webp" alt="movieImage" className='w-full h-90 object-cover transition-transform duration-300 group-hover:scale-105'/>
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="name mt-2 text-2xl font-bold text-white">Interstellar</div>

                    <div className="sname text-blue-400 text-xs font-semibold mt-2 tracking-widest uppercase">SUMMARY</div>
                    <div className="sval text-xs mt-1 text-gray-400 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">A group of elderly people are giving interviews about having lived in a climate of crop blight and constant dust reminiscent of The Great Depression of the 1930's. The first one seen is an elderly woman stating her father was a farmer, but did not start out that way. ...
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, expedita quidem aspernatur consectetur incidunt magnam odit itaque, saepe quos provident quo hic fuga tempore maiores rem labore? Repellendus nulla perferendis laboriosam! Sequi quo, fugit minus quod illum beatae distinctio soluta unde sapiente odio, dolorem enim, minima amet maiores! Enim sapiente nostrum dicta. Fugit dolorum aliquam necessitatibus iste corporis natus soluta ipsa odit! Neque ab adipisci pariatur, ratione voluptas vel soluta at eligendi laboriosam laudantium nemo recusandae nulla tempora, quidem temporibus maiores numquam dolore necessitatibus id tenetur molestiae placeat similique. Amet vero ipsa ducimus mollitia dolore voluptates dolorem non debitis perspiciatis sint quibusdam quod natus corrupti placeat saepe, eum beatae aperiam, eos hic, voluptas asperiores incidunt voluptatem dolor! Neque esse nihil voluptatibus expedita hic, voluptate earum cupiditate rem necessitatibus labore repellendus, ipsam ex tempore, dignissimos quisquam iste libero tempora perferendis id voluptates repudiandae? Possimus sint quidem vero cum officiis quisquam earum fugit id esse facilis accusantium velit quas corporis maxime facere quia omnis sit reprehenderit, necessitatibus expedita maiores laudantium rem. Rem, qui. Iusto vitae libero quod quos consectetur obcaecati voluptate minus saepe quas alias ipsum voluptas, sint at, non, eligendi ullam sit. Suscipit dolor dolorum illo est quia, praesentium dicta repudiandae.
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovieTemplate
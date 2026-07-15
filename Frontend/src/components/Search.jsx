import React, { useState } from 'react'
import { Plus, Minus } from "lucide-react"



const Search = () => {
    const [summary, setSummary] = useState('')
    const [inpType, setInpType] = useState('summary')
    const [movieNo, setMovieNo] = useState(5)

    const [bInclude, setBInclude] = useState(true)
    const [hInclude, setHInclude] = useState(true)

    const summaryChange = (e) => {
        setSummary(e.target.value)
    }

    const changeBIncType = (e) => {
        // to prevent both the checkbox off at same time
        if (hInclude == false && e.target.checked == false) {
            return
        }
        setBInclude(e.target.checked)

    }
    const changeHIncType = (e) => {
        if (bInclude == false && e.target.checked == false) {
            return
        }
        setHInclude(e.target.checked)
    }

    const inptypeChange = (e) => {
        if (inpType == 'summary') {
            setInpType('name')
        }
        else if (inpType == 'name') {
            setInpType('summary')
        }
    }
    const changeMovieNo = (val) => {

        if (val == 'dec') {
            if (movieNo <= 1) {
                return
            }
            setMovieNo(p => p - 1)
        }
        if (val == 'inc') {
            setMovieNo(p => p + 1)
        }
    }

    const recommendMovie = async () => {

        if (inpType == 'summary') {
            if (summary.trim() === '') {
                return
            }

            if (bInclude && hInclude) {
                try {
                    const res = await fetch("http://127.0.0.1:5000/recommend", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            movie: summary,
                            movieNo: movieNo,
                        })
                    })

                    if (!res.ok) {
                        console.log(await res.text())
                        return
                    }
                    const data = await res.json()
                    console.log(data)

                } catch (error) {
                    console.log(error)
                }
            }
            else if(bInclude){
                try {
                    const res = await fetch("http://127.0.0.1:5000/bollywood", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            bmovie: summary,
                            movieNo: movieNo,
                        })
                    })

                    if (!res.ok) {
                        console.log(await res.text())
                        return
                    }
                    const data = await res.json()
                    console.log(data)

                } catch (error) {
                    console.log(error)
                }
            }
            else if(hInclude){
                try {
                    const res = await fetch("http://127.0.0.1:5000/hollywood", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            hmovie: summary,
                            movieNo: movieNo,
                        })
                    })

                    if (!res.ok) {
                        console.log(await res.text())
                        return
                    }
                    const data = await res.json()
                    console.log(data)

                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <>
            <div className="btn w-full flex justify-center mt-3">
                <div className="btnmain">
                    <div className="btntext flex justify-center font-mono text-xl text-white">Search Movie By</div>
                    <div className="button flex justify-center mt-4">
                        <label className="relative inline-flex items-center cursor-pointer hover:opacity-90 transition-opacity">
                            <input className="sr-only peer" value="" onChange={inptypeChange} type="checkbox" />

                            <div className="peer rounded-full outline-none duration-300 after:duration-500 w-48 h-10 bg-blue-300 peer-focus:outline-none 
                                after:content-['Summary'] after:absolute after:outline-none after:rounded-full after:h-8 after:w-24 after:bg-white after:top-1 after:left-1 
                                after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold after:text-sm after:shadow-sm
                                peer-checked:after:translate-x-22 peer-checked:after:content-['Name']">
                            </div>

                        </label>
                    </div>
                </div>
            </div>

            {/* <div className="test">
                {inpType}
            </div> */}
            <div className="main w-full flex justify-center h-120 p-12 mt-4">
                <div className="middle w-full max-w-2xl flex items-center flex-col">
                    <textarea className='summaryInp no-scrollbar resize-none w-full h-20 bg-gray-800 text-white border border-gray-600 rounded-2xl p-3 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all shadow-inner placeholder-gray-400"' id='summaryInp' value={summary} type='text' placeholder={inpType == 'summary' ? "Describe the movie you want to watch... " : "Enter movie name"} onChange={summaryChange} />

                    <div className="movieNo flex mt-3 select-none">
                        <div className="dec w-8 h-8 rounded-full border border-gray-600 m-3 cursor-pointer flex justify-center items-center" onClick={() => changeMovieNo('dec')}>
                            <Minus size={16} />
                        </div>
                        <div className="movieNoDsp w-8 h-8 rounded-xl border border-gray-600 m-3 flex justify-center items-center">{movieNo}</div>
                        <div className="inc w-8 h-8 rounded-full border border-gray-600 m-3 cursor-pointer flex justify-center items-center" onClick={() => changeMovieNo('inc')}>
                            <Plus size={18} />
                        </div>
                    </div>

                    <div className="btype flex items-center space-x-2 mt-4">
                        <input
                            type="checkbox"
                            name="bmovie"
                            id="bmovie"
                            className="w-5 h-5 accent-blue-500 cursor-pointer"
                            checked={bInclude}
                            onChange={changeBIncType}
                        />
                        <label htmlFor="bmovie" className="text-white font-mono cursor-pointer">
                            Bollywood Movies
                        </label>
                    </div>

                    <div className="htype flex items-center space-x-2 mt-2 ">
                        <input
                            type="checkbox"
                            name="hmovie"
                            id="hmovie"
                            className="w-5 h-5 accent-blue-500 cursor-pointer"
                            checked={hInclude}
                            onChange={changeHIncType}
                        />
                        <label htmlFor="hmovie" className="text-white font-mono cursor-pointer">
                            Hollywood Movies
                        </label>
                    </div>

                    {/* <div className="test">
                        Hval : {String(hInclude)}
                    </div> */}
                    <div className="rec">
                        <button className='cursor-pointer mt-5 bg-blue-500 p-3 rounded-xl' onClick={recommendMovie}>Recommend</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Search
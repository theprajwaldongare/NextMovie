import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main m-10 p-12 bg-gray-800 flex justify-center">
        <div className="main text-cyan-700">NextMovie</div>
      </div>
    </>
  )
}

export default App

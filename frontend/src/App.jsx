import React from 'react'
import { Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
    </>
  )
}

export default App
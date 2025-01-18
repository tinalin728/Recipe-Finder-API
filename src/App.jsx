import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Browse from './pages/Browse'
import Fav from "./pages/Fav"
import Detail from "./pages/Detail"


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={< />} /> */}
        <Route path='/browse' element={<Browse />} />
        <Route path='/favorite' element={<Fav />} />
        <Route path='/recipe/:id' element={<Detail />} />
      </Routes>
    </Router>
  )
}

export default App


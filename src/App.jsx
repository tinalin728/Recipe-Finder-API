import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from "./pages/Home"
import Fav from "./pages/Fav"
import Detail from "./pages/Detail"


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorite' element={<Fav />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App


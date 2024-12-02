import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from "./pages/Home"
import Fav from "./pages/Fav"
import Detail from "./pages/Detail"


function App() {

  const [favs, setFavs] = useState([]);

  //retrieved favs from local storage
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem('favs')) || [];
    if (storedFavs) {

      setFavs(storedFavs)
    }
  }, [])

  const toggleFav = (recipe) => {
    if (!recipe || !recipe.id) {
      console.error("Invalid recipe object:", recipe);
      return;
    }

    //array.some(callback)
    //iterates through each element(fav)
    //compares the id with the current fav.id to recipeId passed in
    const updatedFavs = favs.some((fav) => fav.id === recipe.id) ? favs.filter((fav) => fav.id !== recipe.id) // Remove if already favorited
      : [...favs, recipe]; // Add to existing favorites

    //set favorites to updatedFavs
    setFavs(updatedFavs);

    //stored in local storage
    localStorage.setItem('favs', JSON.stringify(updatedFavs));

    // setFav((prevState) => ({
    //     //copy existing favs
    //     ...prevState,
    //     //toggle current recipes' fav status
    //     [id]: !prevState[id]
    // }))
  }


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home favs={favs} toggleFav={toggleFav} />} />
        <Route path='/favorite' element={<Fav favs={favs} toggleFav={toggleFav} />} />
        <Route path='/recipe/:id' element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App


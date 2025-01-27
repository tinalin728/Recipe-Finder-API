import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Browse from './pages/Browse'
import Fav from "./pages/Fav"
import Detail from "./pages/Detail"
import List from './pages/List'


function App() {
  const [savedFavs, setSavedFavs] = useState(() => {
    const saved = localStorage.getItem('favs');
    return saved ? JSON.parse(saved) : [];
  });


  const toggleFav = (recipe) => {
    let favs = JSON.parse(localStorage.getItem('favs')) || [];

    // Check if the recipe already exists
    const exists = favs.some(fav => fav.id === recipe.id);

    if (exists) {
      // Remove the recipe if already in favorites
      favs = favs.filter(fav => fav.id !== recipe.id);
    } else {
      // Add the full recipe object
      favs.push(recipe);
    }

    localStorage.setItem('favs', JSON.stringify(favs));
    setSavedFavs(favs);
  };



  const [groceryList, setGroceryList] = useState(() => {
    // Load saved list from localStorage
    const storedList = localStorage.getItem('groceryList');
    return storedList ? JSON.parse(storedList) : [];
  });

  // Function to add ingredients to the list (avoiding duplicates)
  const addIngredients = (ingredients) => {
    setGroceryList((prevList) => {
      const uniqueIngredients = [...new Set([...prevList, ...ingredients])];
      return uniqueIngredients;
    });
  };

  // Function to remove an ingredient from the list
  const removeIngredient = (item) => {
    setGroceryList((prevList) => prevList.filter((i) => i !== item));
  };

  // Persist grocery list to local storage
  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList]);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Browse savedFavs={savedFavs} toggleFav={toggleFav} />} />
        <Route path='/list' element={<List groceryList={groceryList} removeIngredient={removeIngredient} />} />
        <Route path='/favorite' element={<Fav savedFavs={savedFavs} toggleFav={toggleFav} />} />
        <Route path='/recipe/:id' element={<Detail addIngredients={addIngredients} savedFavs={savedFavs} toggleFav={toggleFav} />} />
      </Routes>
    </Router>
  )
}

export default App


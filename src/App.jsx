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

  const [lists, setLists] = useState(() => {
    const storedList = localStorage.getItem("lists");
    return storedList ? JSON.parse(storedList) : { Grocery: [], Fridge: [] };
  });

  const [pendingIngredient, setPendingIngredient] = useState(null);

  // States for modal messages
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");


  const toggleFav = (recipe) => {
    let favs = JSON.parse(localStorage.getItem('favs')) || [];

    const exists = favs.some(fav => fav.id === recipe.id);

    if (exists) {
      favs = favs.filter(fav => fav.id !== recipe.id);
    } else {
      favs.push(recipe);
    }

    localStorage.setItem('favs', JSON.stringify(favs));
    setSavedFavs(favs);
  };


  // Function to check for duplicates and open modal
  const openDuplicateCheckModal = (message, ingredients) => {
    setModalMessage(message);
    setPendingIngredient(ingredients);
    setModalOpen(true);
  };

  // Function to show confirmation modal
  const openConfirmationModal = (message) => {
    setConfirmMessage(message);
    setConfirmModalOpen(true);
    setTimeout(() => setConfirmModalOpen(false), 2000); // Auto-close after 2s
  };


  // Function to add ingredients to the list (avoiding duplicates)
  // Function to add ingredients to the list (avoiding duplicates)
  const addToList = (items) => {
    setLists((prevLists) => {
      let shouldAdd = true;
      const newGroceryList = [...prevLists.Grocery];

      items.forEach((item) => {
        const ingredient = item.trim();

        if (prevLists.Fridge.includes(ingredient)) {
          const userResponse = window.confirm(
            `${ingredient} is already in your fridge. Would you like to add it to your list?`
          );

          if (!userResponse) {
            shouldAdd = false;
          } else {
            const existingIndex = newGroceryList.findIndex((groceryItem) => groceryItem.startsWith(ingredient));

            if (existingIndex !== -1) {
              const currentItem = newGroceryList[existingIndex];
              const match = currentItem.match(/\((\d+)\)$/);
              let count = match ? parseInt(match[1]) + 1 : 2;

              newGroceryList[existingIndex] = `${ingredient} (${count})`;
            } else {
              newGroceryList.push(ingredient);
            }
          }
        } else {
          const existingIndex = newGroceryList.findIndex((groceryItem) => groceryItem.startsWith(ingredient));

          if (existingIndex !== -1) {
            const currentItem = newGroceryList[existingIndex];
            const match = currentItem.match(/\((\d+)\)$/);
            let count = match ? parseInt(match[1]) + 1 : 2;

            newGroceryList[existingIndex] = `${ingredient} (${count})`;
          } else {
            newGroceryList.push(ingredient);
          }
        }
      });

      if (shouldAdd) {
        const updatedLists = { ...prevLists, Grocery: newGroceryList };
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        openConfirmationModal("Your list has been updated!");
        return updatedLists;
      }
      return prevLists;
    });
  };


  // Saves list to local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  //function to add items to list from
  const updateGroceryList = (newGroceryList) => {
    setLists((prevLists) => {
      const updatedLists = { ...prevLists, Grocery: newGroceryList };
      localStorage.setItem('lists', JSON.stringify(updatedLists));
      return updatedLists;
    });

    openConfirmationModal("Your list has been updated!");
  };

  // Example usage in handleAddToList
  // const handleAddToList = (items) => {
  //   setLists((prevLists) => {
  //     let shouldAdd = true;
  //     const newGroceryList = [...prevLists.Grocery];
  //     const duplicateItems = [];

  //     items.forEach((item) => {
  //       const ingredient = item.trim();


  //       if (prevLists.Fridge.includes(ingredient)) {
  //         const userResponse = window.confirm(
  //           `${ingredient} is already in your fridge. Would you like to add it to your list?`
  //         );

  //         if (!userResponse) {
  //           shouldAdd = false;

  //         } else {
  //           const existingIndex = newGroceryList.findIndex((groceryItem) => groceryItem.startsWith(ingredient));

  //           if (existingIndex !== -1) {
  //             const currentItem = newGroceryList[existingIndex];
  //             const match = currentItem.match(/\((\d+)\)$/);
  //             let count = match ? parseInt(match[1]) + 1 : 2;

  //             newGroceryList[existingIndex] = `${ingredient} (${count})`;
  //           } else {
  //             newGroceryList.push(ingredient);
  //           }
  //         }
  //       } else {
  //         const existingIndex = newGroceryList.findIndex((groceryItem) => groceryItem.startsWith(ingredient));

  //         if (existingIndex !== -1) {
  //           const currentItem = newGroceryList[existingIndex];
  //           const match = currentItem.match(/\((\d+)\)$/);
  //           let count = match ? parseInt(match[1]) + 1 : 2;

  //           newGroceryList[existingIndex] = `${ingredient} (${count})`;
  //           duplicateItems.push(ingredient);
  //         } else {
  //           newGroceryList.push(ingredient);
  //         }
  //       }
  //     });

  //     if (duplicateItems.length > 0) {
  //       const message = `You already have ${duplicateItems.join(", ")} in your grocery list. Would you still like to add more?`;
  //       openDuplicateCheckModal(message, newGroceryList);
  //     } else if (shouldAdd) {
  //       updateGroceryList(newGroceryList);
  //     }
  //     return prevLists;
  //   });
  // };


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Browse savedFavs={savedFavs} toggleFav={toggleFav} />} />
        <Route path='/list' element={<List
          lists={lists}
          setLists={setLists}
          confirmModalOpen={confirmModalOpen}
          setConfirmModalOpen={setConfirmModalOpen}
          confirmMessage={confirmMessage}
          setConfirmMessage={setConfirmMessage}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalMessage={modalMessage}
          setModalMessage={setModalMessage}
          pendingIngredient={pendingIngredient}
          setPendingIngredient={setPendingIngredient}
          updateGroceryList={updateGroceryList}
        />} />

        <Route path='/favorite' element={<Fav savedFavs={savedFavs} toggleFav={toggleFav} />} />

        <Route path='/recipe/:id'
          element={
            <Detail
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalMessage={modalMessage}
              setModalMessage={setModalMessage}
              savedFavs={savedFavs}
              toggleFav={toggleFav}
              pendingIngredient={pendingIngredient}
              setPendingIngredient={setPendingIngredient}
              updateGroceryList={updateGroceryList}
              confirmModalOpen={confirmModalOpen}
              setConfirmModalOpen={setConfirmModalOpen}
              confirmMessage={confirmMessage}
              setConfirmMessage={setConfirmMessage}
              lists={lists}
              setLists={setLists}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App;

import React, { useEffect, useState } from 'react'
import banner from '../../public/assets/banner.jpg'
import fav from '../../public/assets/fav.jpg'
import list from '../../public/assets/list.jpg'
import { NavLink, Link } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import RecipeCard from '../components/RecipeCard';
import placeholder from '../../public/assets/noImg.jpg'

export default function Home({ savedFavs, toggleFav }) {
    const [dayRecipes, setDayRecipes] = useState(null);
    // const apiKey = '94223c8104e6456d88cf145ec6ecdf6b';
    const apiKey = 'cf116ecafaab4cda83a585339c3346de';

    useEffect(() => {
        // Retrieve stored recipes and the last fetch date from local storage
        const storedRecipes = localStorage.getItem("recipesOfTheDay");
        const lastFetchDate = localStorage.getItem("lastFetchDate");
        const today = new Date().toISOString().split("T")[0];

        // Clear local storage if the stored date is not today (to refresh daily data)
        if (lastFetchDate !== today) {
            localStorage.clear();
        }

        //  Use stored recipes if they were fetched today to avoid unnecessary API calls
        if (storedRecipes && lastFetchDate === today) {

            setDayRecipes(JSON.parse(storedRecipes));

        } else {

            // else fetch 3 new recipes and store them
            fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`)
                .then((response) => response.json())
                .then((data) => {

                    // Check if the response contains valid recipes, update the state with new recipes, and store them in local storage
                    if (data.recipes && data.recipes.length > 0) {
                        setDayRecipes(data.recipes);
                        localStorage.setItem("recipesOfTheDay", JSON.stringify(data.recipes));
                        localStorage.setItem("lastFetchDate", today);
                    } else {
                        console.error("No recipes found in API response.");
                    }
                })
                .catch((error) => console.error("Error fetching recipes:", error));
        }
    }, []);


    return (
        <>
            <section className='max-w-container overflow-hidden h-full mt-10'>
                <div className='relative h-[55vh] bg-white overflow-hidden px-2 md:px-6 lg:px-10 dark:border dark:border-primary-light dark:border-opacity-20'>
                    <div className='relative z-20 flex flex-col justify-center h-full text-white'>
                        <h1 className='text-center md:text-left'>Welcome to Nomly!</h1>
                        <h3 className='capitalize pt-6 px-4 text-white font-light leading-snug max-w-[40rem] text-center mx-auto md:text-left md:mx-0 md:px-0'>  Where you can discover delicious recipes, save your favorites, and create grocery lists with ease.
                        </h3>
                        <div className="mt-10 mx-auto md:mx-0 ">
                            <NavLink
                                to="/browse"
                                className="relative font-montserrat text-xl px-4 py-3 text-black bg-accent hover:bg-accent-darker rounded-lg transition duration-500 shadow-md inline-flex justify-center items-center group"
                            >
                                <span className="tracking-wide ">
                                    Browse Recipes
                                </span>
                                <span
                                    className="inline-block ml-2 text-2xl transform transition-transform duration-500 group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </NavLink>
                        </div>
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-neutral/20 w-full h-full z-10'> </div>
                    <div className='absolute top-0 left-0 z-0 w-full h-full'>
                        <img src={banner} className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>


            <section className='flex flex-col gap-10 max-w-container my-10 md:flex-row '>
                <Link to='/favorite' className="flex-1 h-full bg-white relative overflow-hidden group dark:border dark:border-primary-light dark:border-opacity-20">
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 group-hover:backdrop-blur-sm transition-all duration-500">
                        <h2
                            className="text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                            Saved Recipes
                        </h2>
                        <h4
                            className="text-gray-200 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-hover:translate-y-[0px] tracking-wide">
                            You have <span className='text-2xl px-2 font-medium text-white'> {savedFavs.length}</span> saved recipes
                        </h4>
                    </div>
                    <img src={fav} alt="favorite recipe" className='' />
                </Link>
                <Link to='/list' className="flex-1 h-full bg-white relative overflow-hidden group dark:border dark:border-primary-light dark:border-opacity-10">
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40  group-hover:backdrop-blur-sm transition-all duration-500">
                        <h2
                            className="text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                            Shopping List
                        </h2>
                        <h4
                            className="text-white lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-hover:translate-y-[0px] tracking-wide">
                            Add to your shopping list now
                        </h4>
                    </div>
                    <img src={list} alt="shopping list" />
                </Link>
            </section>


            <section className='max-w-container mt-10 mb-20'>
                <div className='relative overflow-hidden'>
                    <div className="z-10 flex items-center gap-2 mb-4">
                        <IonIcon name="star" className="text-[28px] text-yellow-400" />
                        <h2 className="text-black dark:text-white">Recipes of the Day</h2>
                    </div>

                    <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {dayRecipes && dayRecipes.length > 0 ? (
                            dayRecipes.map((recipe) => {
                                return (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        placeholder={placeholder}
                                        isFavorite={savedFavs.includes(recipe.id)}
                                        handleFavClick={() => toggleFav(recipe.id)}
                                    />
                                )
                            })
                        ) : (
                            <p className="p-6 text-gray-500">Loading Recipes of the Day...</p>
                        )}
                    </div>
                </div>
            </section>
        </>

    )
}

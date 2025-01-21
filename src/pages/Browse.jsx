import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import banner from '../../public/assets/banner.jpg';
import IonIcon from '@reacticons/ionicons';
import placeholder from '../../public/assets/noImg.jpg';

export default function Browse({ toggleFav, savedFavs }) {
    const [recipes, setRecipes] = useState([]);
    const cuisines = ['Italian', "French", "Chinese", "Korean"];
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilter, setShowFilter] = useState(false);


    const apiKey = '94223c8104e6456d88cf145ec6ecdf6b';
    // const apiKey = 'cf116ecafaab4cda83a585339c3346de';

    //function to search for recipes based on the entered search term
    const searchRecipes = () => {
        //fetch random recipes from API
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`)
            .then(response => response.json())
            .then(data => {
                //filter recipes based on the search term entered by the user
                const filteredRecipes = data.recipes.filter((recipe) =>
                    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setRecipes(filteredRecipes);
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    };

    //fetch 12 random recipes
    useEffect(() => {
        if (!selectedCuisine) {
            fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`)
                .then(response => response.json())
                .then(data => setRecipes(data.recipes))
                .catch((error) => console.error("Error fetching recipes:", error));
        }
    }, [selectedCuisine]);

    //fetch based on cuisines
    const handleFilter = (cuisine) => {
        setSelectedCuisine(cuisine);

        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}&number=12`)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    setRecipes(data.results);
                } else {
                    console.error("No recipes found for this cuisine.");
                }
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    }

    return (
        <>
            <section className='max-w-container pt-10 pb-[6rem] lg:py-10'>
                <h2 className="uppercase pb-4 border-b dark:border-b-primary-light text-center md:text-left">Browse Recipes</h2>

                <div className="mt-10 mb-6">
                    <div className="w-full flex items-center">
                        <input
                            type="text"
                            placeholder="Search Your Cravings"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="w-full  p-5 border border-black focus:outline-none placeholder:tracking-wider placeholder:font-light placeholder:italic"

                        />
                        <button className="p-4 flex items-center justify-center bg-accent hover:bg-accent-darker border border-black"
                            onClick={searchRecipes}
                        >
                            <IonIcon name="search" className="text-3xl" />
                        </button>
                    </div>
                    <p className='mt-2 font-light'>Popular Search Terms: Pasta, Chicken Teriyaki</p>
                </div>

                <div className='py-4 border-t border-b mb-10 dark:border-t-primary-light dark:border-b-primary-light'>
                    <div className='flex justify-between'>
                        <button onClick={() => setShowFilter(!showFilter)}
                            className='block md:hidden'>
                            <IonIcon name='filter' className='text-[28px] p-2' />
                        </button>
                        <button
                            className='tracking-wide text-lg block md:hidden'
                            onClick={() => {
                                setSelectedCuisine(null);
                                fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`)
                                    .then(response => response.json())
                                    .then(data => setRecipes(data.recipes))
                                    .catch((error) => console.error("Error fetching recipes:", error));
                            }}
                        >
                            Reset Filter
                        </button>
                    </div>
                    <div className={`${showFilter ? 'block mt-2' : 'hidden'} md:flex md:flex-wrap md:justify-between md:w-full lg:flex-row items-center  md:gap-4`}>
                        <div className='flex flex-wrap gap-4 lg:flex-row'>
                            {
                                cuisines.map((cuisine, index) => (
                                    <div key={index} className={`px-6 py-1 border w-fit rounded-full cursor-pointer dark:border-primary-light ${selectedCuisine === cuisine ? 'bg-dark-bg text-white dark:bg-primary-light dark:text-black' : 'bg-transparent hover:bg-primary-light dark:hover:bg-sec-dark'}`}
                                        onClick={() => handleFilter(cuisine)}
                                    >
                                        <p className='tracking-wide text-lg'> {cuisine} </p>
                                    </div>
                                ))
                            }
                        </div>
                        <button
                            className='tracking-wide text-lg hidden md:block'
                            onClick={() => {
                                setSelectedCuisine(null);
                                fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`)
                                    .then(response => response.json())
                                    .then(data => setRecipes(data.recipes))
                                    .catch((error) => console.error("Error fetching recipes:", error));
                            }}
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            placeholder={placeholder}
                            isFavorite={savedFavs.includes(recipe.id)}
                            handleFavClick={() => toggleFav(recipe.id)}
                        />
                    ))}
                </div>
            </section>

        </>
    );
}
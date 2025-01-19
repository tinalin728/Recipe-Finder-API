import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import banner from '../../public/assets/banner.jpg';
import IonIcon from '@reacticons/ionicons';
import placeholder from '../../public/assets/noImg.jpg';

export default function Browse({ toggleFav, savedFavs }) {
    const [recipes, setRecipes] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");


    // const apiKey = '94223c8104e6456d88cf145ec6ecdf6b';
    const apiKey = 'cf116ecafaab4cda83a585339c3346de';

    const searchRecipes = () => {
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`)
            .then(response => response.json())
            .then(data => {
                const filteredRecipes = data.recipes.filter((recipe) =>
                    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setRecipes(filteredRecipes);
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    };


    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`)
            .then(response => response.json())
            .then(data => setRecipes(data.recipes))
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);


    const bannerBg = {
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <>
            <section className='max-w-container'>
                <h2 className="uppercase my-10 pb-4 border-b dark:border-b-primary-light text-center md:text-left">Browse Recipes</h2>

                <div className=" mt-6">
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
                    <p>Popular Search Terms: Pasta, Chicken Teriyaki</p>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-container">

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                placeholder={placeholder}
                                isFavorite={savedFavs.includes(recipe.id)} // Check if recipe ID is in favs
                                handleFavClick={() => toggleFav(recipe.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
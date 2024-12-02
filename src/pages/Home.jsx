import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import RecipeCard from '../components/RecipeCard';
import banner from '../assets/banner.jpg'
import IonIcon from '@reacticons/ionicons';
import placeholder from '../assets/noImg.jpg'

export default function Home({ favs, toggleFav }) {

    const [recipes, setRecipes] = useState([]);
    const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const storedPopular = localStorage.getItem('popular-recipes');

            if (storedPopular) {
                // Use cached data from localStorage
                setPopular(JSON.parse(storedPopular));
                console.log('Loaded popular recipes from local storage');
            } else {
                // Fetch from API if no data in localStorage
                try {
                    const apiKey = '94223c8104e6456d88cf145ec6ecdf6b';
                    const apiKey2 = 'cf116ecafaab4cda83a585339c3346de';
                    const api = await fetch(
                        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey2}&number=12`
                    );

                    const data = await api.json();
                    setPopular(data.recipes);

                    // Save data to localStorage
                    localStorage.setItem('popular-recipes', JSON.stringify(data.recipes));
                    console.log('Fetched and saved popular recipes to local storage');
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            }
        };

        fetchRecipes();
    }, []);


    // const apiKeys = [
    //     '94223c8104e6456d88cf145ec6ecdf6b',
    //     'cf116ecafaab4cda83a585339c3346de'
    // ];

    // let currentKeyIndex = 0;

    // const getRecipes = async () => {
    //     if (currentKeyIndex >= apiKeys.length) {
    //         console.error('All API keys have been exhausted.');
    //         return;
    //     }

    //     const apiKey = apiKeys[currentKeyIndex];

    //     try {
    //         const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=12`);
    //         if (response.status === 402) {
    //             console.warn(`API key ${apiKey} exceeded limit. Switching to the next key...`);
    //             currentKeyIndex++;
    //             return getRecipes(); // Retry with the next key
    //         } else if (response.ok) {
    //             const data = await response.json();
    //             console.log('Fetched recipes:', data.recipes);
    //             return data.recipes;
    //         } else {
    //             console.error('Error fetching recipes:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // getRecipes();

    const bannerBg = {
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

    }

    return (
        <>
            <section className='relative w-full h-[50vh]' style={bannerBg}>
                <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center'>
                    <div className='max-w-container text-center'>
                        <h1 className='text-white mb-4'>Running out of ideas to cook? </h1>
                        <h1 className='text-green'>Unleash Your Culinary Creativity here</h1>
                    </div>
                </div>
            </section>
            <section className='pt-10'>
                <div className='max-w-container mt-6'>
                    <div className='w-full flex justify-center items-center'>
                        <input type="text" placeholder='Search Your Cravings' className='w-full pl-4 py-4 border border-black focus:outline-none' />

                        <button className='h-[3.6rem] w-[3.6rem] flex items-center justify-center bg-white border border-black'>
                            <IonIcon name='search' className='text-3xl' />
                        </button>
                    </div>
                    <p>Popular Search Terms: Pasta, Chicken Teriyaki</p>

                </div>
            </section>

            <section className='pt-10'>
                <div className='max-w-container'>
                    <div className='text-left pb-10'>
                        <h2>Recommended Recipes </h2>
                        <p> Popular Choices</p>
                    </div>

                    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {popular.map((recipe) => {
                            //console.log(favs[recipe.id]) //if toggled, would return true

                            return (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    placeholder={placeholder}

                                    //some() method tests 'is this recipe in the favs?'
                                    isFavorite={favs.some((fav) => fav.id === recipe.id)}

                                    //pass the toggleFav function
                                    handleFavClick={toggleFav}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

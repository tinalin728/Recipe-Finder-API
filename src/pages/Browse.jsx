import React, { useEffect, useState } from 'react';
import fetchRecipes from '../hooks/fetchRecipes';
import IonIcon from '@reacticons/ionicons';
import RecipeCard from '../components/RecipeCard';
import { storeData, getStoredData } from '../utils/storage';
import placeholder from '../../public/assets/noImg.jpg';
import rice from '../../public/assets/rice.svg'
import riceWhite from '../../public/assets/rice-white.svg'
import noodlesWhite from '../../public/assets/noodles-white.svg'
import noodles from '../../public/assets/noodles.svg'
import burger from '../../public/assets/burger.svg'
import burgerWhite from '../../public/assets/burger-white.svg'
import vegetarian from '../../public/assets/vegie.svg'
import vegetarianWhite from '../../public/assets/vegie-white.svg'



export default function Browse({ toggleFav, savedFavs }) {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [filteredRecipes, setFilteredRecipes] = useState(null);
    const [showFiltered, setShowFiltered] = useState(false);
    const filters = [
        { name: 'Rice', light: rice, dark: riceWhite },
        { name: 'Noodle', light: noodles, dark: noodlesWhite },
        { name: 'Burger', light: burger, dark: burgerWhite },
        { name: 'Vegetarian', light: vegetarian, dark: vegetarianWhite }
    ];

    const [selectedFilter, setSelectedFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    // const apiKey = 'cf116ecafaab4cda83a585339c3346de';

    // Fetch initial categories only (not filters)
    const { recipes: dayRecipes, isLoading: dayLoading } = fetchRecipes("recipesOfTheDay", "", "random");
    const { recipes: winterComfortFood, isLoading: winterLoading } = fetchRecipes("winterComfortFood", "soup,stew", "complexSearch");


    //function for second fetch if initial fetch has no recipe.extendedIngredients
    const fetchDetailedRecipe = async (recipe) => {
        if (!recipe.id) return recipe; // Ensure the recipe has an ID

        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&includeNutrition=false`);
            if (!response.ok) throw new Error(`Error fetching detailed recipe: ${response.status}`);

            const detailedRecipe = await response.json();
            return detailedRecipe.extendedIngredients ? detailedRecipe : recipe; // Return the detailed recipe if it has extendedIngredients
        } catch (error) {
            console.error("Error fetching detailed recipe details:", error);
            return recipe; // Return the original recipe if fetch fails
        }
    };


    // Function to handle category filter
    const handleFilter = async (filter) => {
        setSelectedFilter(filter);
        setShowFiltered(true);

        const storageKey = `filtered_${filter}`;
        const storedRecipes = getStoredData(storageKey);

        if (storedRecipes) {
            setFilteredRecipes(storedRecipes);
            return;
        }

        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${filter}&number=10`);
            if (!response.ok) throw new Error(`Error fetching detailed recipe: ${response.status}`);

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const fullRecipes = await Promise.all(data.results.map(fetchDetailedRecipe));

                setFilteredRecipes(fullRecipes);
                storeData(storageKey, fullRecipes);
            } else {
                console.error("No recipes found for this filter.");
                setFilteredRecipes([]);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            // return null;
        }
    };


    // Function to handle search input
    const searchRecipes = async () => {
        if (!searchTerm.trim()) return;
        setShowFiltered(true);
        setSelectedFilter(null);

        const storageKey = `search_${searchTerm}`;
        const storedRecipes = getStoredData(storageKey)

        if (storedRecipes) {
            setFilteredRecipes(storedRecipes);
            return;
        }

        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&number=10`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const fullRecipes = await Promise.all(
                    data.results.map(async (recipe) => await fetchDetailedRecipe(recipe))
                );

                setFilteredRecipes(fullRecipes);
                storeData(storageKey, fullRecipes);
            } else {
                console.error("No recipes found for the search term.");
                setFilteredRecipes([]);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };


    // Function to reset the view to the original state
    const resetView = () => {
        setShowFiltered(false);
        setSearchTerm("");
        setSelectedFilter(null);
    };

    const RecipeSection = ({ title, recipes, icon, iconClasses }) => (
        <section className='pb-[5rem]'>
            <div className='flex gap-2 items-center mb-4'>
                <IonIcon name={icon} className={`text-4xl ${iconClasses}`} />
                <h3 className="text-black dark:text-white normal-case leading-normal font-semibold">{title}</h3>
            </div>

            {recipes && recipes.length > 0 ? (
                <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 2xl:grid-cols-4'>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id}
                            recipe={recipe}
                            placeholder={placeholder}
                            isFavorite={savedFavs.some((fav) => fav.id === recipe.id)}
                            handleFavClick={() => toggleFav(recipe)}
                        />
                    ))}
                </div>
            ) : (
                <h3 className="py-20 text-center border border-gray-500 border-dashed bg-gray-50 h-full normal-case dark:bg-sec-dark dark:border-primary-light ">
                    {recipes ? "Sorry, We're out of requests for now. Please try again soon! 😓😢" : "Loading..."}
                </h3>
            )}
        </section>
    );


    return (
        <>
            <section className='max-w-container pt-10 pb-[6rem] lg:py-10'>

                <div className="mt-10">
                    <div className="w-full flex items-center">
                        <input
                            type="text"
                            placeholder="Search Your Cravings"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    searchRecipes();
                                }
                            }}
                            className="w-full px-5 py-[1.2rem] text-black border border-black focus:outline-none placeholder:tracking-wider placeholder:font-light placeholder:italic dark:placeholder:text-gray-800 dark:border-primary-light"
                        />
                        <button
                            className="p-4 flex items-center justify-center bg-accent hover:bg-accent-darker border border-black dark:border-primary-light"
                            onClick={searchRecipes}
                        >
                            <IonIcon name="search" className="text-3xl dark:text-black" />
                        </button>
                        {showFiltered && (
                            <button
                                className="p-2 ml-4 bg-red-500 hover:bg-red-600 border border-black dark:border-primary-light"
                                onClick={resetView}
                            >
                                Reset Filter
                            </button>
                        )}
                    </div>
                    <p className='mt-2 font-light'>Popular Search Terms: Pasta, Chicken Teriyaki</p>
                </div>

                <div className='py-6 dark:border-t-primary-light'>
                    <div className='flex flex-wrap gap-7 justify-center lg:flex-row lg:gap-10'>
                        {filters.map((filter, index) => (
                            <div
                                key={index}
                                className={`flex flex-col justify-center items-center gap-1 cursor-pointer group`}
                                onClick={() => handleFilter(filter.name)}
                            >
                                <div
                                    className={`filter-icon-wrapper rounded-full w-fit p-2 transition-all duration-150 
                ${selectedFilter === filter.name ? 'border bg-accent border-accent-darker dark:bg-accent -translate-y-1' : ''}`}
                                >
                                    {selectedFilter === filter.name ? (
                                        <img
                                            src={filter.light}
                                            alt={filter.name}
                                            className="w-10 h-10"
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={filter.light}
                                                alt={filter.name}
                                                className="w-10 h-10 dark:hidden"
                                            />
                                            <img
                                                src={filter.dark}
                                                alt={filter.name}
                                                className="w-10 h-10 hidden dark:block"
                                            />
                                        </>
                                    )}
                                </div>
                                <p className={`tracking-wide text-base ${selectedFilter === filter.name ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-100'}`}>
                                    {filter.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {showFiltered ? (
                    <section className='pb-[6rem] lg:pt-2'>
                        {filteredRecipes?.length > 0 ? (
                            <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-y-10 2xl:grid-cols-4'>
                                {filteredRecipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        placeholder={placeholder}
                                        isFavorite={savedFavs.includes(recipe.id)}
                                        handleFavClick={() => toggleFav(recipe.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='flex justify-center items-center py-20 border border-dashed bg-gray-50 h-[50vh] dark:bg-sec-dark dark:border-primary-light'>
                                <h3 className="text-center leading-normal normal-case ">Sorry, We're out of requests for now. <br /> Please try again soon! 😓😢</h3>
                            </div>

                        )}
                    </section>

                ) : (
                    <>
                        <RecipeSection title="Recipes of the Day" recipes={dayRecipes} icon='flame' iconClasses='text-red' />
                        <RecipeSection title="Winter Comfort Food" recipes={winterComfortFood} icon='snow' iconClasses='text-[#89CFF0]' />
                    </>
                )}
            </section>
        </>
    );
}







{/* <div className='relative overflow-hidden'>
                        <div className="z-10 flex items-center gap-2 mb-4">
                            <IonIcon name="star" className="text-[28px] text-yellow-400" />
                            <h2 className="text-black dark:text-white">Monthly Recipe Trends</h2>
                        </div>

                        <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4'>
                            {monthlyTrends && monthlyTrends.length > 0 ? (
                                monthlyTrends.map((recipe) => {
                                    return (
                                        <RecipeCard
                                            key={recipe.id}
                                            recipe={recipe}
                                            placeholder={placeholder}
                                            isFavorite={savedFavs.includes(recipe.id)}
                                            handleFavClick={() => toggleFav(recipe.id)}
                                        />
                                    );
                                })
                            ) : (
                                <p className="p-6 text-gray-500">Loading Recipes of the Day...</p>
                            )}
                        </div>
                    </div> */}

// useEffect(() => {
//     // Retrieve stored recipes and the last fetch date from local storage
//     const storedRecipes = localStorage.getItem("recipesOfTheDay");
//     const lastFetchDate = localStorage.getItem("lastFetchDate");
//     const today = new Date().toISOString().split("T")[0];

//     // Clear local storage if the stored date is not today (to refresh daily data)
//     if (lastFetchDate !== today) {
//         localStorage.clear();
//     }

//     //  Use stored recipes if they were fetched today to avoid unnecessary API calls
//     if (storedRecipes && lastFetchDate === today) {

//         setDayRecipes(JSON.parse(storedRecipes));

//     } else {

//         // else fetch 3 new recipes and store them
//         fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=4`)
//             .then((response) => response.json())
//             .then((data) => {

//                 // Check if the response contains valid recipes, update the state with new recipes, and store them in local storage
//                 if (data.recipes && data.recipes.length > 0) {
//                     setDayRecipes(data.recipes);
//                     localStorage.setItem("recipesOfTheDay", JSON.stringify(data.recipes));
//                     localStorage.setItem("lastFetchDate", today);
//                 } else {
//                     console.error("No recipes found in API response.");
//                 }
//             })
//             .catch((error) => console.error("Error fetching recipes:", error));
//     }
// }, []);



{/* <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-6 lg:gap-10 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            placeholder={placeholder}
                            isFavorite={savedFavs.includes(recipe.id)}
                            handleFavClick={() => toggleFav(recipe.id)}
                        />
                    ))}
                </div> */}

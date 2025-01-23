import React, { useEffect, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import RecipeCard from '../components/RecipeCard';
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
    const apiKey = 'cf116ecafaab4cda83a585339c3346de';

    const [dayRecipes, setDayRecipes] = useState([]);
    const [winterComfortFood, setWinterComfortFood] = useState([]);

    // Function to fetch category recipes (initial categories only)
    const fetchCategoryRecipes = (key, query, apiType, setState) => {
        const storedRecipes = localStorage.getItem(key);
        const lastFetchDate = localStorage.getItem(`${key}_date`);
        const today = new Date().toISOString().split("T")[0];

        if (storedRecipes && lastFetchDate === today) {
            setState(JSON.parse(storedRecipes));
        } else {
            let apiUrl;
            if (apiType === "random") {
                apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=4`;
            } else if (apiType === "menuItems") {
                apiUrl = `https://api.spoonacular.com/food/menuItems/search?apiKey=${apiKey}&query=${query}&number=4`;
            }

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`API limit exceeded or network issue. Status: ${response.status}`);
                    }
                    return response.json();
                }).then((data) => {
                    const recipeResults = data.results || data.recipes || data.menuItems;
                    if (recipeResults && recipeResults.length > 0) {
                        setState(recipeResults);
                        localStorage.setItem(key, JSON.stringify(recipeResults));
                        localStorage.setItem(`${key}_date`, today);
                    } else {
                        console.error(`No recipes found for query: ${query}`);
                    }
                })
                .catch((error) => {
                    console.error(`Error fetching ${key}:`, error);
                    alert("Oops! You've reached the API request limit. Please try again later.");

                });
        }
    };

    // Fetch initial categories only (not filters)
    useEffect(() => {
        fetchCategoryRecipes("recipesOfTheDay", "", "random", setDayRecipes);
        fetchCategoryRecipes("winterComfortFood", "soup", "menuItems", setWinterComfortFood);
    }, []);

    // Function to handle category filter
    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        setShowFiltered(true);

        fetch(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${filter}&number=10`)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    setFilteredRecipes(data.results);
                } else {
                    console.error("No recipes found for this filter.");
                }
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    };

    // Function to handle search input
    const searchRecipes = () => {
        if (!searchTerm.trim()) return;
        setShowFiltered(true);

        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&number=10`)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    setFilteredRecipes(data.results);
                } else {
                    console.error("No recipes found for the search term.");
                }
            })
            .catch((error) => console.error("Error fetching recipes:", error));
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

            <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4'>
                {recipes ? recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} placeholder={placeholder} />
                )) : <p className="p-6 text-gray-500">Loading...</p>}
            </div>
        </section>
    );

    return (
        <>
            <section className='max-w-container pt-10 pb-[6rem] lg:py-10'>
                {/* <div className='py-10 bg-white dark:bg-sec-dark'>
                    <h2 className="pb-2 text-center">Welcome to Nomly!</h2>
                    <p className=" text-lg text-center px-2"> Discover delicious recipes, save your favorites, and create grocery lists with ease.</p>
                </div> */}

                <div className="mt-10">
                    <div className="w-full flex items-center">
                        <input
                            type="text"
                            placeholder="Search Your Cravings"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="w-full px-5 py-[1.2rem] border border-black focus:outline-none placeholder:tracking-wider placeholder:font-light placeholder:italic"
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
                    <div className='flex flex-wrap gap-8 justify-center lg:flex-row lg:gap-10'>
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
                        <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-y-10 xl:grid-cols-4'>
                            {filteredRecipes?.length > 0 ? (
                                filteredRecipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        placeholder={placeholder}
                                        isFavorite={savedFavs.includes(recipe.id)}
                                        handleFavClick={() => toggleFav(recipe.id)}
                                    />
                                ))
                            ) : (
                                <p className="p-6 text-gray-500">No recipes found.</p>
                            )}
                        </div>
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

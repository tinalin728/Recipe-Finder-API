import { useState, useEffect } from 'react';
import { getStoredData, storeData } from '../utils/storage';

const fetchRecipes = (key, query, apiType) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipesData = async () => {
            const today = new Date().toISOString().split("T")[0];

            // Retrieve stored data
            const storedRecipes = getStoredData(key);
            const lastFetchDate = localStorage.getItem(`${key}_date`) || "";

            // console.log(`Stored recipes for ${key}:`, storedRecipes);
            // console.log(`Last fetch date for ${key}:`, lastFetchDate);
            setIsLoading(true);

            let initialRecipes = [];

            // If stored data is fresh, use it
            if (storedRecipes && lastFetchDate === today && storedRecipes.length > 0) {
                setRecipes(storedRecipes);
                setIsLoading(false);
                return;
            }

            let apiUrl;
            if (apiType === "random") {
                apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=6`;
            } else if (apiType === "complexSearch") {
                apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${query}&number=6`;
            }

            try {
                const response = await fetch(apiUrl);

                // error handling
                if (!response.ok) {
                    throw new Error(`API limit exceeded or network issue. Status: ${response.status}`);
                }
                const data = await response.json();
                initialRecipes = data.results || data.recipes || data.menuItems || [];

                if (initialRecipes.length > 0) {
                    storeData(key, initialRecipes);
                    localStorage.setItem(`${key}_date`, today);
                } else {
                    console.warn(`No recipes found for query: ${query}`);
                }
            } catch (err) {
                setError(err.message);
                console.error(`Error fetching ${key}:`, err);
                setIsLoading(false);
                return;
            }

            // Perform a second fetch if `extendedIngredients` are missing in the first fetch
            //All recipe details are fetched in parallel instead of one by one to improve performance.
            const updatedRecipes = await Promise.all(
                initialRecipes.map(async (recipe) => {
                    // Ensure valid recipe
                    if (!recipe || !recipe.id) return null;

                    try {
                        const detailResponse = await fetch(
                            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${import.meta.env.VITE_API_KEY}&includeNutrition=false`
                        );
                        if (!detailResponse.ok) {
                            throw new Error(`Error fetching details for ID ${recipe.id}`);
                        }
                        const detailedData = await detailResponse.json();
                        return detailedData?.extendedIngredients ? detailedData : null;
                    } catch (error) {
                        console.error(`Error fetching details for recipe ID: ${recipe.id}`, error);
                        return null;  // Return null to remove invalid recipes
                    }
                })
            );

            // Remove null values before updating state
            const validRecipes = updatedRecipes.filter(recipe => recipe !== null);

            setRecipes(validRecipes);
            storeData(key, validRecipes);
            setIsLoading(false);
        };

        fetchRecipesData();
    }, [key, query, apiType]);

    return { recipes, isLoading, error };
};

export default fetchRecipes;

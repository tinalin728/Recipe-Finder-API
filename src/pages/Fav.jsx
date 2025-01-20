import { Navigate, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import placeholder from '../../public/assets/noImg.jpg';
import { useEffect, useState } from 'react';

export default function Fav({ savedFavs = [], toggleFav }) {
    const navigate = useNavigate();

    const apiKey = '94223c8104e6456d88cf145ec6ecdf6b';
    // const apiKey = 'cf116ecafaab4cda83a585339c3346de';

    const [favRecipes, setFavRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFavRecipes = () => {
        setLoading(true);
        //removes duplicates
        const uniqueFavs = [...new Set(savedFavs)];

        if (uniqueFavs.length === 0) {
            setFavRecipes([]);
            setLoading(false);
            return;
        }

        fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${uniqueFavs.join(',')}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setFavRecipes(data);
            })
            .catch((err) => {
                console.error('Error fetching favorite recipes:', err);
                setError('Failed to load favorite recipes. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // UseEffect to fetch recipes only if necessary
    useEffect(() => {
        if (favRecipes.length === savedFavs.length) return; // Avoid unnecessary fetch
        fetchFavRecipes();
    }, [savedFavs]);



    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <section className='h-full pb-[8rem] lg:pb-10'>
            <div className="max-w-container">
                <h2 className="uppercase my-10 pb-4 border-b dark:border-b-primary-light text-center md:text-left">My Saved Recipes</h2>

                {favRecipes.length === 0 ? (
                    <div className="text-center h-screen">
                        <h1 className="p-2 inline-black">Time to build your recipes</h1>
                        <button onClick={() => navigate('/')}> Back to Home Page</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                placeholder={placeholder}
                                isFavorite={true} // Always true for favorite recipes
                                handleFavClick={() => toggleFav(recipe.id)} // Use local toggle
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

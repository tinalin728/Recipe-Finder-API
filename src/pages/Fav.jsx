import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import placeholder from '../../public/assets/noImg.jpg';
import { useEffect, useState } from 'react';

export default function Fav({ savedFavs = [], toggleFav }) {
    const navigate = useNavigate();

    const [favRecipes, setFavRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve full recipes from localStorage
        const storedFavs = JSON.parse(localStorage.getItem('favs')) || [];

        setFavRecipes(storedFavs);

        setLoading(false);
    }, [savedFavs]);  // Re-run if savedFavs changes

    return (
        <section className='h-full pb-[8rem] lg:pb-10'>
            <div className="max-w-container">
                <h2 className="uppercase my-10 pb-4 border-b dark:border-b-primary-light text-center md:text-left">
                    My Saved Recipes
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : favRecipes.length === 0 ? (

                    <div className="text-center h-[80vh] flex flex-col gap-4 justify-center items-center">
                        <h1 className="p-2">Time to build your recipes</h1>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 px-6 py-2 border bg-accent rounded-md hover:bg-accent-darker"
                        >
                            Back to Home Page
                        </button>
                    </div>

                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:grid-cols-4">
                        {favRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                placeholder={placeholder}
                                isFavorite={true}
                                handleFavClick={() => toggleFav(recipe)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

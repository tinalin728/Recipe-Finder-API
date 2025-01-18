import { Navigate, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import placeholder from '../../public/assets/noImg.jpg';
import { useEffect, useState } from 'react';

export default function Fav() {
    const navigate = useNavigate();

    const apiKey = '94223c8104e6456d88cf145ec6ecdf6b';

    const [savedFavs, setSavedFavs] = useState(() => {
        const saved = localStorage.getItem('favs');
        return saved ? JSON.parse(saved) : [];
    });

    const [favRecipes, setFavRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Toggle favorite directly in this component
    const toggleFav = (recipeID) => {
        const updatedFavs = savedFavs.includes(recipeID)
            ? savedFavs.filter((favId) => favId !== recipeID) // Remove favorite
            : [...savedFavs, recipeID]; // Add favorite

        localStorage.setItem('favs', JSON.stringify(updatedFavs)); // Update localStorage
        setSavedFavs(updatedFavs); // Update state
    };

    useEffect(() => {
        if (savedFavs.length === 0) {
            setFavRecipes([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${savedFavs.join(',')}`)
            .then((response) => response.json())
            .then((data) => {
                setFavRecipes(data); // The data is an array of favorite recipes
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching favorite recipes:', err);
                setError('Failed to load favorite recipes. Please try again later.');
                setLoading(false);
            });
    }, [savedFavs, apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className='h-full pb-10'>
            <div className="max-w-container">
                <h1 className="uppercase text-dark my-10 pb-4 border-b border-dark">My Favorites</h1>

                {favRecipes.length === 0 ? (
                    <div className="text-center h-screen">
                        <h1 className="p-2 inline-black">Time to build your recipes</h1>
                        <button onClick={() => navigate('/')}> Back to Home Page</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

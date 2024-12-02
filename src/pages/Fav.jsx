import RecipeCard from '../components/RecipeCard'
import placeholder from '../assets/noImg.jpg'


export default function Fav({ favs, toggleFav }) {

    return (
        <section>
            <div className='max-w-container'>
                <h1 className='uppercase text-dark my-10 pb-4 border-b border-dark'>My Favorites</h1>

                {favs.length === 0 ? (
                    <div className='text-center h-screen'>
                        <h1 className='p-2 bg-dark inline-black'>Time to build your recipes</h1>
                    </div>
                ) :
                    (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {favs.map((recipe, index) => (
                                <RecipeCard key={index}
                                    recipe={recipe}
                                    placeholder={placeholder}
                                    isFavorite={true}
                                    handleFavClick={toggleFav}
                                />
                            ))}
                        </div>
                    )}

            </div>
        </section>
    )
}

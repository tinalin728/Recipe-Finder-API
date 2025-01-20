import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useParams, useLocation } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import placeholder from '../../public/assets/noImg.jpg'


export default function Detail({ addIngredients }) {

    const [isAdded, setIsAdded] = useState(false);

    const handleAddToList = () => {
        setIsAdded(true);

        // Optional: Reset the button text after a delay (e.g., 2 seconds)
        setTimeout(() => setIsAdded(false), 2000);
    };


    // Recipe data is passed from the previous page via React Router's state    
    const location = useLocation();
    const { recipe } = location.state; // Access the passed recipe data

    const [favorites, setFavorites] = useState(() => {
        // retrieved recipes that are favs from the local storage, parsed from a JSON string into a JavaScript array 
        const saved = localStorage.getItem('favs');
        return saved ? JSON.parse(saved) : [];
    })

    //toggle the fav status
    const handleFavClick = (id) => {
        //if id is alreaady in the array
        const updatedFavs = favorites.includes(id) ? favorites.filter((favId) => favId !== id) : [...favorites, id];
        setFavorites(updatedFavs);
        localStorage.setItem('favs', JSON.stringify(updatedFavs));
    }

    const isFavorite = (id) => favorites.includes(id);

    useEffect(() => {
        const saved = localStorage.getItem('favs')
        if (saved) {
            setFavorites(JSON.parse(saved))
        }
    }, [])

    console.log('Recipe Data:', recipe);

    if (!recipe) return <p>No recipe details available.</p>;

    const renderInstructions = (instructions) => {
        if (!instructions) return "No instructions available.";

        // Add custom classes to <ol> and <li>
        const updatedInstructions = instructions
            .replace(/<ol>/g, '<ol class="ml-1">')
            .replace(/<li>/g, '<li class="list-decimal my-6">');

        return updatedInstructions;
    };

    return (
        <>
            <section className='pt-10 pb-[6rem] flex flex-col gap-4 max-w-container lg:py-10'>
                <div className='flex flex-col-reverse gap-4 lg:flex-row'>
                    <div className='basis-[60%]'>
                        <div className='flex flex-col gap-4 h-full'>
                            <div className='p-4 w-full border bg-primary-light dark:bg-sec-dark dark:border-white'>
                                <h1 className=''>{recipe.title}</h1>
                            </div>

                            <div className='flex gap-4 w-full flex-wrap flex-row xl:flex-nowrap flex-none'>
                                <div className='flex gap-4 w-full '>
                                    <div className='border px-4 py-2 flex gap-2 w-full text-nowrap bg-primary-light dark:bg-sec-dark dark:border-white'>
                                        <IonIcon name='alarm' className='text-2xl text-sec-light' />
                                        <p>{recipe.readyInMinutes} Mins</p>
                                    </div>

                                    <div className='border px-4 py-2 text-nowrap flex gap-2 w-full bg-primary-light dark:bg-sec-dark dark:border-white'>
                                        <IonIcon name='happy-outline' className='text-2xl text-sec-light' />
                                        <p>{recipe.servings} Servings</p>
                                    </div>
                                </div>

                                <div className='border px-4 py-2 flex gap-2 w-full bg-primary-light dark:bg-sec-dark dark:border-white'>
                                    <IonIcon name='information-circle' className='text-2xl text-sec-light' />
                                    <ul className='flex gap-2'>
                                        {recipe.diets && recipe.diets.length > 0 ? (recipe.diets.map((diet, index) => (
                                            <li key={index} className='list-none lg:text-nowrap'>
                                                {diet}
                                                {index < recipe.diets.length - 1 && ','}
                                            </li>
                                        ))) :
                                            (<li className='list-none capitalize'>
                                                {recipe.dishTypes}
                                            </li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className='p-4 border h-full relative flex-grow bg-primary-light dark:bg-sec-dark dark:border-white'>
                                <div className='absolute top-0 left-0 bg-sec-light text-white w-full p-2 border-b dark:border-b-primary-light'>
                                    <h3>About</h3>
                                </div>
                                <div className='h-full mt-10'>
                                    <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-4 border basis-[40%] relative bg-primary-light dark:bg-sec-dark dark:border-primary-light'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFavClick(recipe.id);
                            }}
                            className='absolute right-6 top-0 flex justify-center items-center px-4 py-6 bg-black bg-opacity-40'>
                            <IonIcon name='heart'
                                className={`text-3xl transition duration-300
                                    ${isFavorite(recipe.id) ? 'text-red' : 'text-white'}
                                    `} />
                        </button>
                        <img src={recipe.image || placeholder} alt="recipe img" className='w-full object-cover lg:h-full' />
                    </div>
                </div>

                <div className='flex flex-col-reverse gap-4 w-full lg:flex-row'>
                    <div className='border basis-[65%] bg-primary-light dark:bg-sec-dark dark:border-white'>
                        <div className='relative p-4'>
                            <div className='absolute top-0 left-0 bg-sec-light text-white w-full p-2 border-b dark:border-b-primary-light'>
                                <h3>Instructions</h3>
                            </div>

                            <ol className="mt-10 pl-4 list-decimal">
                                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                                    recipe.analyzedInstructions[0].steps.map((step, index) => (
                                        <li key={index} className='my-4 list-decimal'>
                                            {step.step}
                                        </li>
                                    ))
                                ) : (
                                    <li>No instructions available.</li>
                                )}
                            </ol>
                        </div>
                    </div>

                    <div className="border py-4 relative w-full basis-[35%] bg-primary-light dark:bg-sec-dark dark:border-white">
                        <div className="absolute top-0 left-0 bg-sec-light text-white w-full p-2 border-b dark:border-b-primary-light">
                            <h3>Ingredients</h3>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const selectedIngredients = Array.from(e.target.elements)
                                    .filter((el) => el.checked)
                                    .map((el) => el.value);

                                addIngredients(selectedIngredients);
                                handleAddToList();
                            }}
                        >
                            <ul className="pl-4 mt-10">
                                {recipe.extendedIngredients.map((item) => (
                                    <li key={item.id} className="my-4 flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`ingredient-${item.id}`}
                                            value={`${item.amount} ${item.unit} ${item.name}`}
                                            className="mr-2 w-4 h-4 cursor-pointer detail-input"
                                        />
                                        <label
                                            htmlFor={`ingredient-${item.id}`}
                                            className="cursor-pointer"
                                        >
                                            <span className='text-yellow-800 dark:text-yellow-100'>{item.amount} {item.unit} </span>  {item.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="submit"
                                className="mt-4 ml-4 px-4 py-2 bg-accent text-black rounded-lg border hover:bg-accent-darker transition"
                            >
                                {isAdded ? 'Added to the list' : 'Add to list'}
                            </button>
                        </form>

                    </div>

                </div>
            </section>
        </>
    )
}

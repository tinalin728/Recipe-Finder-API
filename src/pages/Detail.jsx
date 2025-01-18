import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useParams, useLocation } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import placeholder from '../../public/assets/noImg.jpg'


export default function Detail() {

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
            <section className='py-10 flex flex-col gap-4 max-w-container'>
                <div className='flex flex-col-reverse gap-4 lg:flex-row'>
                    <div className='basis-[60%]'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between gap-4'>
                                <h1 className='p-4 w-full border'>{recipe.title}</h1>
                            </div>

                            <div className='flex flex-col gap-4 w-full flex-wrap md:flex-row xl:flex-nowrap'>
                                <div className='border px-4 py-2 flex gap-2 w-full'>
                                    <IonIcon name='alarm' className='text-2xl' />
                                    <p>{recipe.readyInMinutes} Mins</p>
                                </div>

                                <div className='border px-4 py-2 text-nowrap flex gap-2 w-full'>
                                    <IonIcon name='people-circle-outline' className='text-2xl' />
                                    <p>Servings: {recipe.servings} </p>
                                </div>

                                <div className='border px-4 py-2 flex gap-2 w-full'>
                                    <IonIcon name='information-circle' className='text-2xl' />
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
                            <div className='p-4 border h-full relative'>
                                <div className='absolute top-0 left-0 bg-primary w-full p-2 border-b'>
                                    <h3>About</h3>
                                </div>
                                <p className='mt-10' dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                            </div>
                        </div>
                    </div>

                    <div className='p-4 border basis-[40%] relative'>
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
                    <div className='border basis-[70%]'>
                        <div className='relative  p-4'>
                            <div className='absolute top-0 left-0 bg-primary w-full p-2 border-b'>
                                <h3>Instructions</h3>
                            </div>

                            <div
                                className="mt-10 pl-4"
                                dangerouslySetInnerHTML={{ __html: renderInstructions(recipe.instructions) }}
                            />
                        </div>
                    </div>

                    <div className='border p-4 relative w-full basis-[30%]'>
                        <div className='absolute top-0 left-0 bg-primary w-full p-2 border-b'>
                            <h3>Ingredients</h3>
                        </div>
                        <ul className='pl-4 mt-10'>
                            {recipe.extendedIngredients.map((item) => (
                                <li key={item.id} className='my-4'>
                                    <span className='text-green-darker mr-2'>
                                        {item.amount} {item.unit}
                                    </span>
                                    {item.name}
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

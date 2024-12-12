import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import placeholder from '../assets/noImg.jpg'

export default function Detail() {

    // Recipe data is passed from the previous page via React Router's state    
    const location = useLocation();
    const { recipe } = location.state; // Access the passed recipe data

    // stored recipes marked as favs
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favs');
        return saved ? JSON.parse(saved) : [];
    })

    const handleFavClick = (id) => {
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


    return (

        <>
            <section className='py-10 flex flex-col gap-4'>
                <div className='max-w-container flex flex-col-reverse gap-4 md:flex-row'>
                    <div className='basis-2/3'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between gap-4'>
                                <h1 className='p-4 w-full border'>{recipe.title}</h1>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavClick(recipe.id);
                                    }}
                                    className='flex justify-center items-center p-4 border bg-green bg-opacity-35'>
                                    <IonIcon name='heart'
                                        className={`text-3xl transition duration-300
                                    ${isFavorite(recipe.id) ? 'text-red' : 'text-white'}
                                    `} />
                                </button>
                            </div>

                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <div className='border px-4 py-2 flex gap-2 w-full'>
                                    <IonIcon name='alarm' className='text-2xl' />
                                    <p>{recipe.readyInMinutes} Mins</p>
                                </div>

                                <div className='border px-4 py-2 flex gap-2 w-full'>
                                    <IonIcon name='information-circle' className='text-2xl' />
                                    <ul className='flex gap-2'>{recipe.diets.map((diet, index) => (
                                        <li key={index} className='list-none'>
                                            {diet}
                                            {index < recipe.diets.length - 1 && ','}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='p-4 border h-full relative'>
                                <div className='absolute top-0 left-0 bg-green w-full p-2 border-b'>
                                    <p>Summary</p>
                                </div>
                                <p className='mt-10' dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                            </div>
                        </div>
                    </div>

                    <div className='p-4 border basis-1/3'>
                        <img src={recipe.image || placeholder} alt="recipe img" className='h-full object-cover' />
                    </div>
                </div>

                <div className='max-w-container flex flex-col gap-4 w-full md:flex-row'>
                    <div className='border basis-2/3'>
                        <div className='relative  p-4'>
                            <div className='absolute top-0 left-0 bg-green w-full p-2 border-b'>
                                <p>Instructions</p>
                            </div>

                            <div className='mt-10 pl-4' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                        </div>
                    </div>

                    <div className='border p-4 relative basis-1/3'>
                        <div className='absolute top-0 left-0 bg-green w-full p-2 border-b'>
                            <p>Ingredients</p>
                        </div>
                        <ul className='pl-4 mt-10'>
                            {recipe.extendedIngredients.map((item) => (
                                <li key={item.id} >
                                    {item.name} {item.amount} {item.unit}
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

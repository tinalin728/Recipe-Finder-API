import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

const RecipeCard = ({ recipe, placeholder, handleFavClick, isFavorite }) => {

    //testing toggle btn
    // const [isToggled, setIsToggle] = useState(false)
    // const handleFavClick = () => {
    //     setIsToggle((prev) => !prev)
    // }



    return (
        <div className='flex flex-col bg-white overflow-hidden relative shadow-sm border border-dark'>
            <div className='relative border-b'>
                <img src={recipe.image || placeholder} alt="recipe image"
                    loading='lazy'
                    className='w-full h-[300px] object-cover cursor-pointer' />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavClick(recipe.id);
                    }}
                    className='absolute top-0 right-4 h-14 w-12 flex justify-center items-center bg-dark bg-opacity-60 shadow-md'>
                    <IonIcon name='heart'
                        className={`text-3xl transition duration-300
                        ${isFavorite ? 'text-red' : 'text-white'}
                        `} />
                </button>
            </div>


            <div className='flex-1 px-6 py-4'>
                {recipe.cuisines && recipe.cuisines.length > 0 ? (
                    <p>
                        {recipe.cuisines.map((cuisine, index) => (
                            <span key={index} className='mb-2 px-2 py-1 mr-2 bg-beige text-dark'> {cuisine} </span>
                        ))}
                    </p>
                ) : (
                    <p className='mb-2 px-2 py-1 mr-2 bg-beige text-dark inline-block'> Chef’s secret recipe </p>
                )}

                <h3 className='mb-4 font-bold tracking-wide'>{recipe.title}</h3>
            </div>


            <div className='border-t border-black'>
                <div className='flex justify-between items-stretch'>
                    <div className='flex items-center gap-2 py-4 px-6'>
                        <IonIcon name='alarm' className='text-3xl text-green-darker' />
                        <p> {recipe.readyInMinutes} Mins</p>
                    </div>
                    <Link to={`/recipe/${recipe.id}`}
                        state={{ recipe }}
                        className='flex items-center border-l border-black px-6 py-4bg-beige-lighter hover:bg-green transition duration-300'>
                        View Now
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default RecipeCard;

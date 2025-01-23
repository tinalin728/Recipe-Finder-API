import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

const RecipeCard = ({ recipe, placeholder, handleFavClick, isFavorite }) => {
    const imageUrl = recipe.image ? recipe.image.replace(/-\d+x\d+/, '-480x360') : placeholder;

    return (
        <Link
            to={`/recipe/${recipe.id}`}
            onClick={(e) => e.stopPropagation()}
            state={{ recipe }}
            className='flex flex-col bg-white dark:bg-sec-dark overflow-hidden relative shadow-sm border dark:border-primary-light '>
            <div className='relative border-b dark:border-b-primary-light'>
                <img src={imageUrl}
                    onError={(e) => { e.target.src = placeholder }}
                    alt="recipe image"
                    loading='lazy'
                    className='w-full h-[180px] object-cover cursor-pointer md:h-[250px]' />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleFavClick(recipe.id);
                    }}
                    className='absolute top-0 right-4 h-12 w-10 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md shadow-md dark:border-x dark:border-b dark:border-primary-light dark:border-opacity-50 md:h-14 md:w-12'>
                    <IonIcon name='heart'
                        className={`text-2xl md:text-3xl transition duration-300
                        ${isFavorite ? 'text-red' : 'text-white'}
                        `} />
                </button>
            </div>


            <div className='flex-1 px-2 py-2 md:px-6 md:py-4'>
                {recipe.cuisines && recipe.cuisines.length > 0 ? (
                    <p>
                        {recipe.cuisines.map((cuisine, index) => (
                            <span key={index} className='text-sm md:text-base mb-1 font-light italic text-gray-800 inline-block rounded-md tracking-wide mr-1 dark:text-gray-100'> {cuisine}
                                {index < recipe.cuisines.length - 1 && " -"}
                            </span>
                        ))}
                    </p>
                ) : (
                    <p className='text-sm md:text-base mb-1 font-light italic text-gray-800 inline-block rounded-md tracking-wide dark:text-gray-100'> Chef’s secret recipe </p>
                )}

                <h3 className='mb-4 font-medium normal-case leading-tight'>{recipe.title}</h3>
            </div>


            <div className='hidden md:block md:border-t md:dark:border-primary-light'>
                <div className='flex justify-between items-stretch'>
                    <div className='flex items-center gap-2 py-4 px-6'>
                        <IonIcon name='alarm' className='text-[28px]' />
                        <p> {recipe.readyInMinutes} Mins</p>
                    </div>

                    <div className='flex items-center border-l border-black px-6 py-4 text-black bg-primary-light hover:bg-accent-darker dark:border-l-primary-light  dark:bg-primary-dark dark:text-white transition duration-500'>
                        <p>View Now</p>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default RecipeCard;

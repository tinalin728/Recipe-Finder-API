import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

const RecipeCard = ({ recipe, placeholder, handleFavClick, isFavorite }) => {

    //testing toggle btn
    // const [isToggled, setIsToggle] = useState(false)
    // const handleFavClick = () => {
    //     setIsToggle((prev) => !prev)
    // }

    const getHighResImage = (imgUrl, newSize = '636x393') => {
        if (!imgUrl) {
            console.log("Image URL is missing, returning placeholder.");
            return placeholder;
        }

        // Log the original URL
        console.log("Original Image URL:", imgUrl);

        // Replace the size
        const highResUrl = imgUrl.replace(/-\d+x\d+/, `-${newSize}`);

        // Log the updated URL
        console.log("High Resolution Image URL:", highResUrl);

        return highResUrl;
    };

    // Example usage
    const recipeImage = "https://img.spoonacular.com/recipes/12345-556x370.jpg";
    const highResImage = getHighResImage(recipeImage);

    // Verify in console
    console.log("Final Image URL for rendering:", highResImage);

    return (
        <div className='flex flex-col bg-primary-light dark:bg-sec-dark overflow-hidden relative shadow-sm border dark:border-primary-light'>
            <div className='relative border-b dark:border-b-primary-light'>
                <img src={getHighResImage(recipe.image || placeholder)} alt="recipe image"
                    loading='lazy'
                    className='w-full h-[300px] object-cover cursor-pointer' />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavClick(recipe.id);
                    }}
                    className='absolute top-0 right-4 h-14 w-12 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md shadow-md dark:border-x dark:border-b dark:border-primary-light dark:border-opacity-50'>
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
                            <span key={index} className='mb-1 font-extralight italic text-gray-500 inline-block rounded-md tracking-wide mr-1 dark:text-gray-100'> {cuisine}
                                {index < recipe.cuisines.length - 1 && " -"}
                            </span>
                        ))}
                    </p>
                ) : (
                    <p className='mb-1 font-extralight italic text-gray-500 inline-block rounded-md tracking-wide dark:text-gray-100'> Chef’s secret recipe </p>
                )}

                <h3 className='mb-4 font-medium tracking-wide  normal-case'>{recipe.title}</h3>
            </div>


            <div className='border-t dark:border-primary-light'>
                <div className='flex justify-between items-stretch'>
                    <div className='flex items-center gap-2 py-4 px-6'>
                        <IonIcon name='alarm' className='text-[28px]' />
                        <p> {recipe.readyInMinutes} Mins</p>
                    </div>
                    <Link to={`/recipe/${recipe.id}`}
                        state={{ recipe }}
                        className='flex items-center border-l border-black px-6 py-4 text-black bg-accent hover:bg-accent-darker dark:border-l-primary-light transition duration-500'>
                        View Now

                    </Link>
                </div>
            </div>
        </div>

    );
};

export default RecipeCard;

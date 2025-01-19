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
        <div className='flex flex-col bg-white overflow-hidden relative shadow-sm border border-dark'>
            <div className='relative border-b'>
                <img src={getHighResImage(recipe.image || placeholder)} alt="recipe image"
                    loading='lazy'
                    className='w-full h-[300px] object-cover cursor-pointer' />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavClick(recipe.id);
                    }}
                    className='absolute top-0 right-4 h-14 w-12 flex justify-center items-center bg-dark bg-opacity-70 shadow-md'>
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
                            <span key={index} className='mb-1 italic text-gray-500 inline-block rounded-md tracking-wide mr-1'> {cuisine}
                                {index < recipe.cuisines.length - 1 && " -"}
                            </span>
                        ))}
                    </p>
                ) : (
                    <p className='mb-1 italic text-gray-500 inline-block rounded-md tracking-wide'> Chef’s secret recipe </p>
                )}

                <h3 className='mb-4 font-medium tracking-wide text-black normal-case'>{recipe.title}</h3>
            </div>


            <div className='border-t border-black'>
                <div className='flex justify-between items-stretch'>
                    <div className='flex items-center gap-2 py-4 px-6'>
                        <IonIcon name='alarm' className='text-[28px]' />
                        <p> {recipe.readyInMinutes} Mins</p>
                    </div>
                    <Link to={`/recipe/${recipe.id}`}
                        state={{ recipe }}
                        className='flex items-center border-l border-black px-6 py-4 bg-beige hover:bg-primary hover:text-white transition duration-300'>
                        View Now

                    </Link>
                </div>
            </div>
        </div>

    );
};

export default RecipeCard;

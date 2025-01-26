import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useParams, useLocation } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import placeholder from '../../public/assets/noImg.jpg'


export default function Detail({ addIngredients, savedFavs, toggleFav }) {

    const [isAdded, setIsAdded] = useState(false);
    const location = useLocation();
    const { id } = useParams();

    const recipeId = location.state?.id || id;
    const apiType = location.state?.apiType || "recipes";

    const recipe = location.state?.recipe;
    // const [recipe, setDetailedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToList = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (isLoading) return <p>Loading recipe details...</p>;
    if (!recipe) return <p>No recipe found.</p>;

    return (
        <>
            {!recipeId ? (
                <section className='h-screen pt-10 pb-[6rem] flex flex-col justify-center items-center gap-4 max-w-container lg:py-10'>
                    <h1 className=''> Recipe not found. Please try again.</h1>
                </section>
            ) : !recipe ? (
                <section className='h-screen pt-10 pb-[6rem] flex flex-col justify-center items-center gap-4 max-w-container lg:py-10'>
                    <h1 className=''> Recipe not found. Please try again.</h1>
                </section>
            ) : (
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
                                    e.preventDefault();
                                    toggleFav(recipe);
                                }}
                                className='absolute right-6 top-0 flex justify-center items-center px-4 py-6 bg-black bg-opacity-40'>
                                <IonIcon name='heart'
                                    className={`text-3xl transition duration-300
                                    ${savedFavs.some(fav => fav.id === recipe.id) ? 'text-red' : 'text-white'}
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
                                        <li key={item.id} className="my-4 flex items-center detail-input">
                                            <input
                                                type="checkbox"
                                                id={`ingredient-${item.id}`}
                                                value={`${item.amount} ${item.unit} ${item.name}`}
                                                className="mr-2 w-4 h-4 cursor-pointer"
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
            )
            }

        </>
    )
}

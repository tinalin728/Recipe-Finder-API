import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useParams, useLocation } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import placeholder from '../../public/assets/noImg.jpg'

import DuplicateCheckModal from '../components/modalMesages/DuplicateCheckModal';
import ConfirmationModal from '../components/modalMesages/ConfirmationModal';


export default function Detail({ savedFavs, toggleFav, updateGroceryList, setModalOpen, modalOpen, modalMessage, setModalMessage, confirmModalOpen, confirmMessage, setConfirmModalOpen, setConfirmMessage, pendingIngredient, setPendingIngredient }) {

    const location = useLocation();
    const { id } = useParams();

    const [isAdded, setIsAdded] = useState(false);


    const recipeId = location.state?.id || id;
    const apiType = location.state?.apiType || "recipes";

    const recipe = location.state?.recipe;
    // const [recipe, setDetailedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleAddToList = (selectedIngredients) => {
        if (!Array.isArray(selectedIngredients) || selectedIngredients.length === 0) {
            console.error("Invalid input in handleAddToList:", selectedIngredients);
            return;
        }

        let lists = JSON.parse(localStorage.getItem("lists")) || { Grocery: [], Fridge: [] };
        let groceryList = Array.isArray(lists.Grocery) ? lists.Grocery : [];
        let fridgeList = Array.isArray(lists.Fridge) ? lists.Fridge : [];

        let newItemsAdded = [];
        let duplicateItems = [];

        selectedIngredients.forEach((ingredient) => {
            let trimmedIngredient = ingredient?.trim();
            if (!trimmedIngredient) return;

            let groceryIndex = groceryList.findIndex(item => item?.name?.toLowerCase() === trimmedIngredient.toLowerCase());
            let fridgeIndex = fridgeList.findIndex(item => item?.name?.toLowerCase() === trimmedIngredient.toLowerCase());

            let existingGrocery = groceryIndex !== -1 ? groceryList[groceryIndex] : null;
            let existingFridge = fridgeIndex !== -1 ? fridgeList[fridgeIndex] : null;

            if (existingGrocery || existingFridge) {
                duplicateItems.push({
                    name: trimmedIngredient,
                    groceryAmount: existingGrocery ? existingGrocery.amount : 0,
                    fridgeAmount: existingFridge ? existingFridge.amount : 0,
                    newAmount: existingGrocery ? existingGrocery.amount + 1 : 1, // ✅ Correct new amount
                });
            } else {
                newItemsAdded.push({ name: trimmedIngredient, amount: 1 }); // Store as object
            }
        });

        if (duplicateItems.length > 0) {
            let message = duplicateItems.map(item => {
                let parts = [];

                let groceryItem = lists.Grocery.find(grocery => grocery.name.toLowerCase() === item.name.toLowerCase());
                let fridgeItem = lists.Fridge.find(fridge => fridge.name.toLowerCase() === item.name.toLowerCase());

                if (groceryItem && fridgeItem) {
                    parts.push(`${groceryItem.amount} ${item.name} in your grocery list and ${fridgeItem.amount} in your fridge.`);
                } else if (groceryItem) {
                    parts.push(`${groceryItem.amount} ${item.name} in your grocery list.`);
                } else if (fridgeItem) {
                    parts.push(`${fridgeItem.amount} ${item.name} in your fridge.`);
                }

                return `You already have ${parts.join(" ")} Would you like to update your grocery list?`;
            }).join("<br>");

            setModalMessage(message);
            setPendingIngredient({ duplicateItems, newItemsAdded });
            setModalOpen(true);
        } else {
            handleConfirmUpdate({ duplicateItems: [], newItemsAdded });
        }

    };

    // This function is called only AFTER the user confirms duplicates
    const handleConfirmUpdate = (pendingData) => {
        if (!pendingData || !pendingData.duplicateItems) {
            console.warn("handleConfirmUpdate: No pending data available.");
            return;
        }

        let lists = JSON.parse(localStorage.getItem("lists")) || { Grocery: [], Fridge: [] };
        let groceryList = Array.isArray(lists.Grocery) ? lists.Grocery : [];

        if (pendingData.duplicateItems.length > 0) {
            pendingData.duplicateItems.forEach(item => {
                let index = groceryList.findIndex(groceryItem => groceryItem.name === item.name);
                if (index !== -1) {
                    groceryList[index].amount = item.newAmount;
                } else {
                    groceryList.push({ name: item.name, amount: item.newAmount });
                }
            });
        }

        if (pendingData.newItemsAdded.length > 0) {
            groceryList.push(...pendingData.newItemsAdded);
        }

        lists.Grocery = groceryList;
        localStorage.setItem("lists", JSON.stringify(lists));
        updateGroceryList(groceryList);
        let confirmMessageParts = [...pendingData.duplicateItems, ...pendingData.newItemsAdded]
            .map(item => `${item.newAmount || item.amount} ${item.name}`)
            .join(", ");

        let finalConfirmMessage = `Updated: You now have ${confirmMessageParts} in your grocery list.`;

        setConfirmMessage(finalConfirmMessage);
        setConfirmModalOpen(true);
        setTimeout(() => setConfirmModalOpen(false), 2000);


        setModalOpen(false);
        setPendingIngredient(null);
    };


    // This is triggered when the user clicks "Yes" in the duplicate confirmation modal
    const handleDuplicateConfirm = () => {
        if (!pendingIngredient) return;

        handleConfirmUpdate(pendingIngredient);
    };

    //  This is triggered when the user clicks "Cancel" in the duplicate confirmation modal
    const handleDuplicateCancel = () => {
        setModalOpen(false);
        setPendingIngredient([]);
    };


    const handleAddToListClick = (e) => {
        e.preventDefault();

        const form = e.target.closest("form");
        if (!form) {
            console.error("handleAddToListClick: No form found.");
            return;
        }

        const selectedIngredients = Array.from(form.elements)
            .filter((el) => el.checked && el.value?.trim() !== "")
            .map((el) => el.value.trim());

        // console.log("Debug: Selected Ingredients before sending:", selectedIngredients);

        if (!selectedIngredients.length) {
            console.warn("No valid ingredients found.");
            return;
        }

        handleAddToList(selectedIngredients);
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

                                <div className='flex gap-4 w-full flex-wrap flex-row flex-none'>
                                    <div className='flex gap-4 w-full '>
                                        <div className='border px-4 py-2 flex gap-2 w-full text-nowrap bg-primary-light dark:bg-sec-dark dark:border-white'>
                                            <IonIcon name='alarm' className='text-2xl' />
                                            <p>{recipe.readyInMinutes} Mins</p>
                                        </div>

                                        <div className='border px-4 py-2 text-nowrap flex gap-2 w-full bg-primary-light dark:bg-sec-dark dark:border-white'>
                                            <IonIcon name='happy' className='text-2xl' />
                                            <p>{recipe.servings} Servings</p>
                                        </div>
                                    </div>

                                    <div className='border px-4 py-2 flex gap-2 w-full bg-primary-light dark:bg-sec-dark dark:border-white'>
                                        <IonIcon name='information-circle' className='text-2xl' />
                                        <ul className='flex gap-2 flex-wrap'>
                                            {recipe.diets && recipe.diets.length > 0 ? (recipe.diets.map((diet, index) => (
                                                <li key={index} className='list-none text-nowrap'>
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
                                    <div className='absolute top-0 left-0 bg-sec-light w-full p-2 border-b dark:border-b-primary-light'>
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
                            <img src={recipe.image || placeholder} alt="recipe img" className='w-full object-cover h-full' />
                        </div>
                    </div>

                    <div className='flex flex-col-reverse gap-4 w-full lg:flex-row'>
                        <div className='border basis-[65%] bg-primary-light dark:bg-sec-dark dark:border-white'>
                            <div className='relative p-4'>
                                <div className='absolute top-0 left-0 bg-sec-light w-full p-2 border-b dark:border-b-primary-light'>
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
                            <div className="absolute top-0 left-0 bg-sec-light w-full p-2 border-b dark:border-b-primary-light">
                                <h3>Ingredients</h3>
                            </div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const selectedIngredients = Array.from(e.target.elements)
                                        .filter((el) => el.checked && el.value?.trim() !== "")
                                        .map((el) => el.value.trim());

                                    if (!selectedIngredients.length) {
                                        console.warn("⚠️ No ingredients selected.");
                                        return;
                                    }

                                    handleAddToList(selectedIngredients);
                                }}
                            >


                                <ul className="pl-4 mt-10">
                                    {recipe.extendedIngredients.map((item, index) => (
                                        <li key={`${item.id}-${index}`} className="my-4 flex items-center detail-input">
                                            <input
                                                type="checkbox"
                                                id={`ingredient-${item.id}`}
                                                value={`${item.name}`}
                                                className="mr-2 w-4 h-4 cursor-pointer"
                                            />
                                            <label
                                                htmlFor={`ingredient-${item.id}`}
                                                className="cursor-pointer"
                                            >
                                                <span className=''>{item.amount} {item.unit} </span>
                                                <span className='font-medium'>
                                                    {item.name}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={handleAddToListClick}
                                    type="submit"
                                    className="mt-4 ml-4 px-4 py-2 bg-accent text-black rounded-lg border hover:bg-accent-darker transition uppercase tracking-wide"
                                >
                                    Add To Grocery List
                                </button>
                            </form>
                        </div>

                        <DuplicateCheckModal
                            isOpen={modalOpen}
                            message={modalMessage}
                            onConfirm={handleDuplicateConfirm}
                            onCancel={() => {
                                setModalOpen(false);
                                setPendingIngredient([]);
                            }}
                        />

                        <ConfirmationModal
                            isOpen={confirmModalOpen}
                            message={confirmMessage}
                            onClose={() => setConfirmModalOpen(false)}
                        />


                    </div>
                </section>
            )
            }

        </>
    )
}

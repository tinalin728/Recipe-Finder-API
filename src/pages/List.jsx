import React, { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import list from '../../public/assets/list.jpg'

export default function List({ groceryList, removeIngredient }) {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();

        if (newItem.trim() === '') {
            alert('Please enter an item.');
            return;
        }

        // Avoid duplicates before adding to the list
        if (groceryList.includes(newItem)) {
            alert('This item is already in the list.');
            return;
        }

        groceryList.push(newItem); // Push new item to the list
        setNewItem(''); // Clear the input field
    };
    const background = {
        backgroundImage: `url(${list})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
        height: 'auto'
    };



    return (
        <section className="relative">
            <div className='max-w-container py-10 relative z-10 h-full'>
                <h2 className="uppercase border-b my-10 pb-4 text-center md:text-left dark:border-b-primary-light">
                    My Shopping List
                </h2>

                <div className='h-full'>
                    <form onSubmit={handleAddItem} className="flex items-center mb-6">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="What do you need to buy?"
                            className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-primary placeholder:tracking-wider placeholder:font-light placeholder:italic dark:bg-sec-dark dark:bg-opacity-80 dark:border-white"
                        />
                        <button
                            type="submit"
                            className="p-4 text-nowrap bg-accent border text-black hover:bg-accent-darker dark:border-white transition duration-300"
                        >
                            Add +
                        </button>
                    </form>

                    {groceryList.length > 0 ? (
                        <ul className="custom-list list-none min-h-[80vh] bg-primary-light dark:bg-sec-dark p-4 border rounded-lg dark:border-primary-light">
                            {groceryList.map((item, index) => (
                                <li key={index} className="py-4 border-b border-dashed dark:border-b-white">
                                    <div className='flex items-center justify-between '>
                                        <span>{item}</span>
                                        <button
                                            onClick={() => removeIngredient(item)}
                                            className="text-red-500 hover:underline"
                                        >
                                            <IonIcon name='trash-outline' className='text-[25px] text-red' />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>


                    ) : (
                        <p className="text-gray-500">Your list is empty. Add some items!</p>
                    )}
                </div>
            </div>
        </section>
    );
}

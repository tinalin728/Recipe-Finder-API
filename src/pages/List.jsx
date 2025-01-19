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
                <h2 className="uppercase border-b my-10 pb-4 text-center md:text-left ">
                    My Shopping List
                </h2>

                <div className='h-full'>
                    <form onSubmit={handleAddItem} className="flex items-center gap-4 mb-6">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Enter an item..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg border hover:bg-green-darker transition"
                        >
                            Add
                        </button>
                    </form>

                    {groceryList.length > 0 ? (
                        <ul className="custom-list list-none min-h-[80vh] bg-white p-4 border rounded-lg">
                            {groceryList.map((item, index) => (
                                <li key={index} className="py-4 border-b border-dashed">
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

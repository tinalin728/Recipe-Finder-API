import React, { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import ConfirmationModal from '../components/modalMesages/ConfirmationModal';
import DuplicateCheckModal from '../components/modalMesages/DuplicateCheckModal';

export default function List({ lists, setLists, setModalMessage, setModalOpen, setConfirmMessage, setConfirmModalOpen, confirmModalOpen, confirmMessage, modalOpen, modalMessage, pendingIngredient, setPendingIngredient, updateGroceryList }) {
    const [newItem, setNewItem] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const [selectedList, setSelectedList] = useState({ name: "", icon: "" });
    const [activeList, setActiveList] = useState('Grocery');
    const [editingItem, setEditingItem] = useState(null);
    const [editedValue, setEditedValue] = useState("");

    const [newAmount, setNewAmount] = useState(1); // New state for amount

    const handleAddItem = (e, selectedIngredients = [newItem.trim()]) => {
        e.preventDefault();

        if (!Array.isArray(selectedIngredients) || selectedIngredients.length === 0) {
            console.error("Invalid input in handleAddItem:", selectedIngredients);
            return;
        }

        if (!selectedList.name) {
            setConfirmMessage("Please select a list to add to!");
            setConfirmModalOpen(true);

            return;
        }

        let lists = JSON.parse(localStorage.getItem("lists")) || { Grocery: [], Fridge: [] };
        let listName = selectedList.name || "Grocery";

        let updatedList = Array.isArray(lists[listName]) ? [...lists[listName]] : [];

        let newItemsAdded = [];
        let duplicateItems = [];

        selectedIngredients.forEach((ingredient) => {
            let trimmedIngredient = ingredient?.trim();
            if (!trimmedIngredient) return;

            let itemIndex = updatedList.findIndex(item => item?.name?.toLowerCase() === trimmedIngredient.toLowerCase());
            let existingItem = itemIndex !== -1 ? updatedList[itemIndex] : null;

            if (existingItem) {
                duplicateItems.push({
                    name: trimmedIngredient,
                    existingAmount: existingItem.amount,
                    newAmount: existingItem.amount + newAmount,
                });
            } else {
                updatedList.push({ name: trimmedIngredient, amount: newAmount });
                newItemsAdded.push({ name: trimmedIngredient, amount: newAmount });
            }
        });

        // Modify message handling for Grocery list
        if (duplicateItems.length > 0) {
            let message = duplicateItems.map(item => {
                let parts = [];

                // Retrieve grocery & fridge counts inside the mapping function
                let groceryItem = lists.Grocery.find(grocery => grocery.name.toLowerCase() === item.name.toLowerCase());
                let fridgeItem = lists.Fridge.find(fridge => fridge.name.toLowerCase() === item.name.toLowerCase());

                if (listName === "Grocery") {
                    if (groceryItem) parts.push(`${groceryItem.amount} ${item.name} in your grocery list`);
                    if (fridgeItem) parts.push(`${fridgeItem.amount} ${item.name} in your fridge`);
                } else {
                    parts.push(`${item.existingAmount} ${item.name} in your ${listName}`);
                }

                return `You already have ${parts.join(" and ")}. Would you like to update your ${listName} list?`;
            }).join("<br>");

            setModalMessage(message);
            setPendingIngredient({ duplicateItems, newItemsAdded, listName }); // Ensure correct list reference
            setModalOpen(true);
        } else {
            applyListUpdate(newItemsAdded, listName);
        }

        setNewItem('');
        setNewAmount(1);
    };



    //  Function to apply updates to the selected list
    const applyListUpdate = (newItems, listName) => {
        let lists = JSON.parse(localStorage.getItem("lists")) || { Grocery: [], Fridge: [] };

        let updatedLists = {
            ...lists,
            [listName]: [...(lists[listName] || []), ...newItems]
        };

        localStorage.setItem("lists", JSON.stringify(updatedLists));
        setLists(updatedLists);

        let confirmMessage = newItems.map(item =>
            `Added: ${item.amount} ${item.name} to your ${listName}.`
        ).join("<br>");

        setConfirmMessage(confirmMessage);
        setConfirmModalOpen(true);
        setTimeout(() => setConfirmModalOpen(false), 2000);
    };



    const handleDuplicateConfirm = () => {
        if (!pendingIngredient || !pendingIngredient.duplicateItems) {
            console.warn("handleDuplicateConfirm: No pending data available.");
            return;
        }

        let lists = JSON.parse(localStorage.getItem("lists")) || { Grocery: [], Fridge: [] };
        let listName = pendingIngredient.listName || "Grocery";

        let updatedList = Array.isArray(lists[listName]) ? [...lists[listName]] : [];

        pendingIngredient.duplicateItems.forEach(item => {
            let index = updatedList.findIndex(existingItem => existingItem.name === item.name);
            if (index !== -1) {
                updatedList[index].amount = item.newAmount;
            } else {
                updatedList.push({ name: item.name, amount: item.newAmount });
            }
        });

        let updatedLists = { ...lists, [listName]: updatedList }; // Only modify selected list

        localStorage.setItem("lists", JSON.stringify(updatedLists));
        setLists(updatedLists); // Triggers UI update

        let confirmMessage = pendingIngredient.duplicateItems.map(item =>
            `Updated: You now have ${item.newAmount} ${item.name} in your ${listName}.`
        ).join("<br>");

        setConfirmMessage(confirmMessage);
        setConfirmModalOpen(true);
        setTimeout(() => setConfirmModalOpen(false), 2000);

        setModalOpen(false);
        setPendingIngredient(null);
    };


    // Cancel should NOT update the list
    // const handleDuplicateCancel = () => {
    //     setModalOpen(false);
    //     setPendingIngredient([]); // Reset pending ingredients
    // };

    const handleDropDown = (e) => {
        e.stopPropagation();
        setDropDown((prev) => !prev)
    }

    const handleSelect = (listName, icon) => {
        setSelectedList({ name: listName, icon: icon });
        setDropDown((prev) => !prev ? false : true);
        // console.log("Dropdown should be closed:", dropDown);
    }

    const handleEdit = (listName, index, currentItem) => {
        if (!currentItem || typeof currentItem !== "object") {
            console.error("Invalid item structure:", currentItem);
            return;
        }

        setEditingItem({ listName, index });
        setEditedValue({
            name: currentItem.name || "",
            amount: currentItem.amount || 1  // Default to 1 if amount is missing
        });
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!editedValue.name.trim() || !editedValue.amount) {
            alert("Please enter a valid name and amount.");
            return;
        }

        setLists((prevLists) => {
            const updatedList = [...prevLists[editingItem.listName]];
            updatedList[editingItem.index] = {
                name: editedValue.name,
                amount: editedValue.amount
            };

            return {
                ...prevLists,
                [editingItem.listName]: updatedList
            };
        });

        setEditingItem(null);
        setEditedValue('');
    };


    const removeIngredient = (index, listType = 'Grocery') => {
        setEditingItem(null); // Prevent jumping to next item

        setLists((prevLists) => {
            const updatedList = prevLists[listType].filter((_, i) => i !== index);
            const updatedLists = { ...prevLists, [listType]: updatedList };

            localStorage.setItem('lists', JSON.stringify(updatedLists));

            return updatedLists;
        });
    };

    const renderList = (listName, additionalClasses = "") => (
        <div className={`border py- 10 min-h-[80vh] bg-white md:flex-1 ${activeList === listName ? 'block' : 'hidden'} ${additionalClasses}`}>
            <h3 className='mt-4 px-4 py-2 border capitalize border-dashed w-fit mx-auto rounded-lg'>
                {listName === 'Grocery' ? 'Time to Restock 💸' : 'Chillin’ in the Fridge 🧊'}
            </h3>
            <ul className='px-3 md:px-4 mt-4'>
                {lists[listName].length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">
                        {listName === 'Grocery' ? 'Nothing in the cart yet' : 'Your fridge is feeling empty.'} <br />
                        {listName === 'Grocery' ? 'What do you need? 😋' : 'What’s inside? 📝'}
                    </p>
                ) : (
                    lists[listName].map((item, index) => (
                        <li key={index} className="py-4 border-b border-dashed dark:border-b-white list-none md:px-2">
                            <div className='flex items-center justify-between'>
                                {editingItem && editingItem.listName === listName && editingItem.index === index ? (
                                    <form onSubmit={handleSaveEdit} className='flex items-center gap-2 w-full'>
                                        <input
                                            type="number"
                                            value={editedValue.amount}
                                            onChange={(e) => setEditedValue({ ...editedValue, amount: e.target.value })}
                                            className="w-16 p-2 border focus:outline-none dark:bg-sec-dark dark:border-white"
                                        />
                                        <input
                                            type="text"
                                            value={editedValue.name}
                                            onChange={(e) => setEditedValue({ ...editedValue, name: e.target.value })}
                                            className="w-full p-2 border focus:outline-none dark:bg-sec-dark dark:border-white"
                                        />
                                        <div className='flex gap-4 ml-3'>
                                            <button type="submit" className="text-blue-500 hover:underline">
                                                <IonIcon name='save' className='text-[25px]' />
                                            </button>
                                            <button type="button" onClick={() => removeIngredient(index, listName)} className="text-red-500 hover:underline">
                                                <IonIcon name='trash-outline' className='text-[25px] text-red' />
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <label className='flex items-center gap-2'>
                                            {item.amount} {item.name}
                                        </label>
                                        <div className='flex items-center gap-2'>
                                            <button onClick={() => handleEdit(listName, index, item)} className="text-blue-500 hover:underline">
                                                <IonIcon name='create-outline' className='text-[25px]' />
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );



    return (
        <section className="relative pt-10 pb-[6rem] lg:py-10">
            <div className='max-w-container relative z-10 h-full'>
                <h2 className="uppercase border-b pb-4 text-center md:text-left dark:border-b-primary-light">
                    My Shopping List
                </h2>

                <div className='h-full mt-10 flex-1 relative z-50'>
                    <div className='flex flex-col  gap-2 mb-4 md:flex-row md:gap-0 md:h-[55px]'>
                        <div onSubmit={handleAddItem} className="bg-white w-full inline-flex items-center  border h-[55px] p-0">
                            <div
                                onClick={handleDropDown}
                                className='text-nowrap relative border-r h-full'>
                                <div className='flex justify-center items-center relative px-2 md:min-w-[130px] h-full'>
                                    {selectedList.icon ? (<>
                                        <IonIcon name={selectedList.icon} className="text-lg p-2" />
                                        <p className='list-none leading-none mr-2 hidden md:block md:ml-2'>
                                            {selectedList.name}
                                        </p>
                                    </>
                                    ) : (
                                        <p className="hidden list-none md:block md:mr-2">Select List</p> // "Select List" on larger screens
                                    )}

                                    <p className={`p-2 list-none leading-none md:hidden ${selectedList.name ? "hidden" : "block"}`}>
                                        List
                                    </p>
                                    <IonIcon name={`${dropDown ? 'caret-up-outline' : 'caret-down-outline'}`} />
                                </div>

                                {dropDown && (
                                    <ul className="absolute bg-white z-50 border top-12 md:top-14 md:w-full">
                                        <li onClick={() => handleSelect('Grocery', 'bag-outline')} className='list-none p-4 hover:bg-gray-200 cursor-pointer '>
                                            <IonIcon name='bag-outline' className='mr-2 text-lg' />
                                            <span>Grocery </span>
                                        </li>
                                        <li onClick={() => handleSelect('Fridge', 'home-outline')} className='list-none p-4 hover:bg-green-200 cursor-pointer '>
                                            <IonIcon name='home-outline' className='mr-2 text-lg' />
                                            <span>
                                                Fridge
                                            </span>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // ✅ Prevents accidental form submission
                                        handleAddItem(e);
                                    }
                                }}
                                placeholder="What do you need to buy?"
                                className="inline-block px-3 w-full h-full focus:outline-none placeholder:tracking-wider placeholder:leading-none placeholder:font-light placeholder:italic dark:bg-sec-dark dark:bg-opacity-80 dark:border-white leading-none"
                            />

                            <div className='relative h-full flex items-center px-2'>
                                <button
                                    type="button"
                                    onClick={() => setNewAmount((prev) => Math.max(1, prev - 1))}
                                    className="px-3 py-1  rounded-full bg-gray-200 hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-10 h-full text-center appearance-none custom-number-input"
                                />

                                <button
                                    type="button"
                                    onClick={() => setNewAmount((prev) => prev + 1)}
                                    className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem(e)}
                            onClick={handleAddItem}
                            className="h-full px-4 py-2 text-nowrap bg-accent border text-black hover:bg-accent-darker dark:border-white transition duration-300 leading-none flex justify-center items-center md:border-0 md:border-y md:border-r" >
                            <span className=' mr-2'> Add </span>
                            <span className='text-xl'> + </span>
                        </button>
                    </div>

                    <div className='flex w-full md:hidden'>
                        <button
                            onClick={() => setActiveList("Grocery")}
                            className={`w-full py-2 border-r border-l border-t inline-flex justify-center items-center ${activeList === "Grocery" ? "bg-gray-300" : ""
                                }`}
                        >
                            <IonIcon name='bag-outline' className='mr-2 text-lg' />
                            Grocery
                        </button>
                        <button
                            onClick={() => setActiveList("Fridge")}
                            className={`w-full py-2 border-r border-t inline-flex justify-center items-center ${activeList === "Fridge" ? "bg-blue-300" : ""
                                }`}
                        >
                            <IonIcon name='home-outline' className='mr-2 text-lg' />
                            Fridge
                        </button>
                    </div>

                    <div className='flex flex-col gap-4 h-full min-h-[80vh] md:flex-row'>
                        {renderList('Grocery')}
                        {renderList('Fridge', "md:block")}

                    </div>
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

            </div >
        </section >
    );
}
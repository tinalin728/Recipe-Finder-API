import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../public/assets/logo.svg'
import whiteLogo from '../../public/assets/white-logo.png'
import IonIcon from '@reacticons/ionicons';

export default function Navbar() {

    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-mode', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);



    return (
        <header className='lg:fixed lg:top-0 lg:h-full lg:max-w-[200px] lg:w-full z-[999] shadow-md'>
            {/* mobile */}
            <div className='block lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[999] w-full  py-3 border-t bg-white dark:bg-primary-dark dark:text-primary-light dark:border-t-primary-light dark:border-opacity-20'>
                <nav className='max-w-container'>
                    <ul className='flex justify-between items-center max-w-container'>
                        <li className='list-none '>
                            <NavLink to='/' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-light' : ''}`} >
                                <IonIcon name="home-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        <li className='list-none'>
                            <NavLink to='/browse' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-light' : ''}`}>
                                <IonIcon name="earth-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Browse
                                </span>
                            </NavLink>
                        </li>

                        <li className='list-none '>
                            <NavLink to='/favorite' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-light' : ''}`}>
                                <IonIcon name="heart-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Saves
                                </span>
                            </NavLink>
                        </li>
                        <li className='list-none'>
                            <NavLink to='/list' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-light' : ''}`}>
                                <IonIcon name="list-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    List
                                </span>
                            </NavLink>
                        </li>

                        <li className='list-none'>
                            <button className='flex flex-col items-center'
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                <IonIcon name={darkMode ? "moon-outline" : "sunny-outline"} className='text-[25px]' />
                                <span className='text-[12px]'> Mode</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* desktop view */}
            <div className='hidden h-full lg:flex lg:flex-col lg:justify-between dark:border-r  dark:border-r-primary-light dark:border-opacity-20'>
                <div className='flex items-center gap-4 p-5 border-b border-black border-opacity-20 flex-none dark:border-b dark:border-primary-light dark:border-opacity-40'>
                    <img src={darkMode ? whiteLogo : logo} alt='logo' width={50} />
                    <span className='text-xl'>
                        Nomly
                    </span>
                </div>

                <nav className='mt-6 h-full'>
                    <ul className='flex flex-col items-start gap-2'>
                        <li className='list-none w-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 pl-5 py-4 ${isActive ? "bg-accent text-black" : ""
                                    }`}
                            >
                                <IonIcon
                                    name="home-outline"
                                    className={`text-[30px]`}
                                />
                                <span className="hidden md:block">Home</span>
                            </NavLink>
                        </li>
                        <li className='list-none w-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <NavLink to='/browse' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-5 ${isActive ? "bg-accent text-black" : ""
                                }`}>
                                <IonIcon name="earth-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Browse
                                </span>
                            </NavLink>
                        </li>

                        <li className='list-none w-full  hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <NavLink to='/favorite' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-5 ${isActive ? "bg-accent text-black" : ""
                                }`}
                            >
                                <IonIcon name="heart-outline" className='text-[30px]' />
                                <span className='hidden md:block text-nowrap'>
                                    Saved Recipes
                                </span>
                            </NavLink>
                        </li>
                        <li className='list-none w-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <NavLink to='/list' className={({ isActive }) =>
                                `flex items-center gap-2 pr-1 py-4 pl-5 ${isActive ? "bg-accent text-black" : ""
                                }`}>
                                <IonIcon name="list-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Shopping List
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='border-t border-black border-opacity-20 dark:border-primary-light dark:border-opacity-20'>
                    <button className='flex items-center gap-2 py-4 pl-5'
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        <IonIcon name={darkMode ? "moon-outline" : "sunny-outline"} className='text-[30px]' />
                        <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

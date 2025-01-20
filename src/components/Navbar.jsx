import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../public/assets/logo.svg'
import whiteLogo from '../../public/assets/white-logo.png'
import greenLogo from '../../public/assets/green-logo.png'
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
            <div className='block lg:hidden fixed bottom-0 z-[999] w-full border-t py-3 bg-white dark:bg-primary-dark dark:text-primary-light dark:border-t-primary-light dark:border-opacity-20'>
                <nav className='max-w-container'>
                    <ul className='bg-green w-full flex justify-center items-center px-2 gap-10 md:gap-20'>
                        <li className='list-none flex justify-between items-center'>
                            <NavLink to='/' className={({ isActive }) => `flex flex-col justify-center items-center  ${isActive ? 'text-primary-dark dark:text-accent' : 'text-gray-500 dark:text-gray-300'}`} >
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "home" : "home-outline"} className='text-[25px]' />
                                        <span className='mt-1 text-[12px]'>Home</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className='list-none'>
                            <NavLink to='/browse' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-dark dark:text-accent' : 'text-gray-500 dark:text-gray-300'}`}>
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "earth" : "earth-outline"} className='text-[25px]' />
                                        <span className='mt-1 text-[12px]'>
                                            Browse
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li className='list-none '>
                            <NavLink to='/favorite' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-dark dark:text-accent' : 'text-gray-500 dark:text-gray-300'}`}>
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "heart" : "heart-outline"} className='text-[25px]' />
                                        <span className='mt-1 text-[12px]'>
                                            Saves
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className='list-none'>
                            <NavLink to='/list' className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'text-primary-dark dark:text-accent' : 'text-gray-500 dark:text-gray-300'}`}>
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "list" : "list-outline"} className='text-[25px]' />
                                        <span className='mt-1 text-[12px]'>
                                            List
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li className='list-none'>
                            <button className='flex flex-col items-center'
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                <IonIcon name={darkMode ? "moon-outline" : "sunny-outline"} className={`text-[25px] ${darkMode ? 'text-accent' : 'text-yellow-500'}`} />
                                <span className='text-[12px] mt-1'> Mode</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* desktop view */}
            <div className='hidden h-full lg:flex lg:flex-col lg:justify-between dark:border-r  dark:border-r-primary-light dark:border-opacity-20'>
                <div className='flex items-center gap-4 p-5 border-b border-black border-opacity-20 flex-none dark:border-b dark:border-primary-light dark:border-opacity-40'>
                    <img src={darkMode ? greenLogo : logo} alt='logo' width={50} />
                    <span className='text-xl'>
                        Nomly
                    </span>
                </div>

                <nav className='mt-6 h-full px-2'>
                    <ul className='flex flex-col items-start gap-2'>
                        <li className='list-none w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 pl-4 py-4 ${isActive ? "bg-dark-bg text-white rounded-md dark:text-black dark:bg-primary-light" : ""
                                    }`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "home" : "home-outline"} className='text-[30px]' />
                                        <span className=''>Home</span>
                                    </>
                                )}

                            </NavLink>
                        </li>
                        <li className='list-none w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                            <NavLink to='/browse' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-4 ${isActive ? "bg-dark-bg text-white rounded-md dark:text-black dark:bg-primary-light" : ""
                                }`}>
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "earth" : "earth-outline"} className='text-[30px]' />
                                        <span>
                                            Browse
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>

                        <li className='list-none w-full  hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                            <NavLink to='/favorite' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-4 ${isActive ? "bg-dark-bg text-white rounded-md dark:text-black dark:bg-primary-light" : ""
                                }`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "heart" : "heart-outline"} className='text-[30px]' />
                                        <span>
                                            Saved Recipes
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className='list-none w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                            <NavLink to='/list' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-4 ${isActive ? "bg-dark-bg text-white rounded-md dark:text-black dark:bg-primary-light" : ""
                                }`}>
                                {({ isActive }) => (
                                    <>
                                        <IonIcon name={isActive ? "list" : "list-outline"} className='text-[25px]' />
                                        <span >
                                            Shopping List
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='border-t border-black border-opacity-20 dark:border-primary-light dark:border-opacity-20'>
                    <button className='flex items-center gap-2 py-4 pl-4'
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        <IonIcon name={darkMode ? "moon-outline" : "sunny-outline"} className={`text-[30px] ${darkMode ? 'text-accent' : 'text-yellow-500'}`} />
                        <span>{darkMode ? 'Dark' : 'Light'} Mode</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../public/assets/logo.svg'
import IonIcon from '@reacticons/ionicons';

export default function Navbar() {
    return (
        <header className='lg:fixed lg:h-full lg:bg-white lg:max-w-[200px] lg:w-full z-[999] shadow-md'>
            {/* mobile */}
            <div className='block lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-[999] w-full bg-white py-3'>
                <nav className=''>
                    <ul className='flex gap-12 justify-center items-center max-w-container'>
                        <li className='list-none '>
                            <NavLink to='/' className='flex flex-col justify-center items-center'>
                                <IonIcon name="home-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        <li className='list-none'>
                            <NavLink to='/browse' className='flex flex-col justify-center items-center'>
                                <IonIcon name="earth-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Browse
                                </span>
                            </NavLink>
                        </li>

                        <li className='list-none '>
                            <NavLink to='/favorite' className='flex flex-col justify-center items-center'>
                                <IonIcon name="heart" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Saves
                                </span>
                            </NavLink>
                        </li>
                        <li className='list-none'>
                            <NavLink to='/' className='flex flex-col justify-center items-center'>
                                <IonIcon name="list-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    List
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* desktop view */}
            <div className='hidden lg:block'>
                <div className='flex items-center gap-4 p-5 shadow-sm'>
                    <img src={logo} alt='logo' width={50} />
                    <span className='text-xl'>
                        Nomly
                    </span>
                </div>

                <nav className='mt-6'>
                    <ul className='flex flex-col items-start gap-2'>
                        <li className='list-none w-full hover:bg-gray-100'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 pl-5 py-4 ${isActive ? "bg-primary text-white" : ""
                                    }`}
                            >
                                <IonIcon
                                    name="home-outline"
                                    className={`text-[30px]`}
                                />
                                <span className="hidden md:block">Home</span>
                            </NavLink>
                        </li>
                        <li className='list-none w-full hover:bg-gray-100'>
                            <NavLink to='/browse' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-5 ${isActive ? "bg-primary text-white" : ""
                                }`}>
                                <IonIcon name="earth-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Browse
                                </span>
                            </NavLink>
                        </li>

                        <li className='list-none w-full  hover:bg-gray-100'>
                            <NavLink to='/favorite' className={({ isActive }) =>
                                `flex items-center gap-2 py-4 pl-5 ${isActive ? "bg-primary text-white" : ""
                                }`}
                            >
                                <IonIcon name="heart-outline" className='text-[30px]' />
                                <span className='hidden md:block text-nowrap'>
                                    Saved Recipes
                                </span>
                            </NavLink>
                        </li>
                        <li className='list-none w-full hover:bg-gray-100'>
                            <NavLink to='/' className={({ isActive }) =>
                                `flex items-center gap-2 pr-1 py-4 pl-5 ${isActive ? "bg-primary text-white" : ""
                                }`}>
                                <IonIcon name="list-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Shopping List
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

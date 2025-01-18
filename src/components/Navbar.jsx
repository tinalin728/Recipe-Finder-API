import React from 'react'
import { Link } from 'react-router-dom'
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
                            <Link to='/' className='flex flex-col justify-center items-center'>
                                <IonIcon name="home-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link to='/browse' className='flex flex-col justify-center items-center'>
                                <IonIcon name="earth-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Browse
                                </span>
                            </Link>
                        </li>

                        <li className='list-none '>
                            <Link to='/favorite' className='flex flex-col justify-center items-center'>
                                <IonIcon name="heart" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    Saves
                                </span>
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link to='/' className='flex flex-col justify-center items-center'>
                                <IonIcon name="list-outline" className='text-[25px]' />
                                <span className='text-[12px]'>
                                    List
                                </span>
                            </Link>
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

                <nav className='mt-2'>
                    <ul className='flex flex-col items-start'>
                        <li className='list-none w-full pr-20 py-4 hover:bg-gray-100'>
                            <Link to='/' className='flex justify-center items-center gap-2'>
                                <IonIcon name="home-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li className='list-none w-full pr-[4.5rem] py-4 hover:bg-gray-100'>
                            <Link to='/browse' className='flex justify-center items-center gap-2'>
                                <IonIcon name="earth-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Browse
                                </span>
                            </Link>
                        </li>

                        <li className='list-none w-full pr-5 py-4 hover:bg-gray-100'>
                            <Link to='/favorite' className='flex justify-center items-center gap-2'>
                                <IonIcon name="heart" className='text-[30px]' />
                                <span className='hidden md:block text-nowrap'>
                                    Saved Recipes
                                </span>
                            </Link>
                        </li>
                        <li className='list-none w-full pr-6 py-4 hover:bg-gray-100'>
                            <Link to='/' className='flex justify-center items-center gap-2'>
                                <IonIcon name="list-outline" className='text-[30px]' />
                                <span className='hidden md:block'>
                                    Shopping List
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

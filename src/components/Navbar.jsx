import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import IonIcon from '@reacticons/ionicons';

export default function Navbar() {
    return (
        <header className='shadow-sm'>
            <nav className='max-w-container py-4'>
                <ul className='flex justify-between items-center'>
                    <li className='list-none'>
                        <Link to='/' className='flex justify-center items-center gap-2'>
                            <img src={logo} alt='logo' width={40} />
                            <span className='hidden md:block'>
                                Recipe Finder
                            </span>
                        </Link>
                    </li>
                    <li className='list-none'>
                        <Link to='/favorite' className='flex justify-center items-center gap-2'>
                            <IonIcon name="heart" className='text-[30px]' />
                            <span className='hidden md:block'>
                                My Favorites
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

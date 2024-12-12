import React from 'react'
import logo from '../assets/logo.svg'

export default function Footer() {
    return (
        <footer className=''>
            <div className='max-w-container py-10'>
                <div className='max-w-[150px] h-[.6px] bg-green-darker mx-auto mb-2'></div>
                <div className='max-w-[200px] h-[.6px] bg-green-darker mx-auto mb-6'></div>
                <div className='flex gap-2 justify-center items-center'>
                    <img src={logo} alt="" width={50} />
                    <p>Recipe Finder</p>
                </div>
            </div>
        </footer>
    )
}

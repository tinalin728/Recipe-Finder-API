import React from 'react'
import { Link } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons'
import banner from '../assets/banner.jpg'
export default function RecipeCard() {
    return (
        <div className='flex flex-col rounded-md bg-white overflow-hidden p-3 relative'>
            <Link to='/' className='relative h-32'>
                <img src={banner} alt="recipe image" className='w-full h-full object-cover cursor-pointer rounded-md' />

                <div className='absolute top-1 right-1 rounded-full h-10 w-10 flex justify-center items-center bg-white'>
                    <IonIcon name='heart-outline' className='text-3xl hover:text-red-600' />
                </div>
            </Link>

            <h3 className='mt-2 font-bold tracking-wide'>Roasted Chicken</h3>
            <p className='my-2'>Turkey Dish</p>

            <div className='flex gap-2 mt-auto'>
                <div className='px-2 py-1 bg-primary rounded-md'>
                    <p className='text-white'> Keto friendly</p>
                </div>
                <div className='px-2 py-1 bg-primary rounded-md'>
                    <p className='text-white'> Keto friendly</p>
                </div>
            </div>
        </div>
    )
}

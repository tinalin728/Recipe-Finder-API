import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import banner from '../assets/banner.jpg'
import IonIcon from '@reacticons/ionicons';
import RecipeCard from '../components/RecipeCard';

export default function Home() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);
    //async = wants to make sure that we have the data first
    const getPopular = async () => {
        const apiKey = 'c276f010d69c41c08d51f0459cdbdf4f';
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`)

        const data = await api.json();
        setPopular(data.recipes)
        console.log(data)
    }

    return (
        <>
            <section className='relative w-full h-full'>
                <img src={banner} alt="food" className='w-full relative' />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className="rounded-xl bg-custom-gradient p-[1px]">
                        <div className="p-4 bg-default rounded-xl">
                            <label className='text-dark-blue'>What are you in the mood to cook today?</label>
                            <div className="flex mt-2">
                                <div className="relative overflow-hidden w-full rounded-md mr-2">
                                    <input
                                        type="text"
                                        className="relative z-10 pl-3 pr-10  h-full bg-default rounded-md focus:outline-none focus:bg-[#f0f4fa] shadow-inner-combined w-[350px] placeholder:text-[#6d7f8f]"
                                        placeholder="Search Your Cravings"
                                    />
                                </div>

                                <button className="Icon min-w-[46px] min-h-[46px] flex justify-center items-center rounded-xl shadow-custom mr-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-10'>
                <div className='max-w-container'>
                    <h1>Recommended Recipes </h1>
                    <p> Popular Choices</p>

                    <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                        {popular.map((recipe, index) => {
                            return (
                                <div key={index} className='flex flex-col rounded-md bg-white overflow-hidden relative shadow-sm'>
                                    <Link to='/' className='relative h-[300px]'>
                                        <img src={recipe.image} alt="recipe image" className='w-full h-full object-cover cursor-pointer rounded-md' />

                                        <div className='absolute top-3 right-4 rounded-full h-12 w-12 flex justify-center items-center bg-icon-primary shadow-md'>
                                            <IonIcon name='heart' className='text-3xl text-white hover:text-red-100' />
                                        </div>
                                    </Link>
                                    <div className='px-6 py-4'>
                                        {recipe.cuisines && recipe.cuisines.length > 0 ? (
                                            <p className='my-2'>
                                                {recipe.cuisines.map((cuisine, index) => (
                                                    <span key={index}> {cuisine}</span>
                                                ))}
                                            </p>
                                        ) : (
                                            <p> Chef’s secret recipe </p>
                                        )}

                                        <h3 className='mb-4 font-bold tracking-wide'>{recipe.title}</h3>


                                        <div className='flex gap-2 mt-auto'>
                                            {recipe.diets.slice(0, 3).map((diet, index) => (
                                                <div key={index} className='px-2 py-1 bg-primary rounded-md'>
                                                    <p className='text-white'> {diet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section>
        </>
    )
}

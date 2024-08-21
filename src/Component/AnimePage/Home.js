import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import catimg2 from './Image/cat2.png';
import Logo1 from './Image/Logo.png';
import Paw from './Image/paw.png';

const Home = () => {
    const [ongoingData, setOngoingData] = useState(null);
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        axios.get('/anime/ongoing?order_by=latest&page=1')
            .then((res) => {
                setOngoingData([...res.data.ongoingAnime]);
            })
            .catch((error) => {
                console.error('Error fetching ongoing anime data:', error);
            });

        axios.get('/anime/movie?order_by=oldest&page=1')
            .then((res) => {
                setMovieData([...res.data.movieAnime]);
            })
            .catch((error) => {
                console.error('Error fetching movie data:', error);
            });
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <>
            <div className='bg-gray-100 dark:bg-black'>
                <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                    <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                        <div className='flex flex-row items-center mb-2'>
                            <img src={Paw} className='w-6 h-6 mr-4' />
                            <span className='font-black dark:text-blue-300 text-2xl'>Ongoing Anime</span>
                        </div>
                        <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                            {ongoingData !== null && ongoingData.map((res) => (
                                <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                    <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                        <div className='h-64 w-full absolute inset-0 bg-gradient-to-b from-transparent to-black mix-blend-multiply'></div>
                                        <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                        <div className='absolute bottom-0 left-0 right-0 px-2 py-2 leading-tight'>
                                            <span className='text-xs font-semibold text-white'>{truncateText(res.title, 20)}</span><br />
                                            <span className='text-xs text-white bg-blue-300 rounded-sm px-2'>{res.episode}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full'>
                        <div className='flex flex-row items-center mb-2'>
                            <img src={Paw} className='w-6 h-6 mr-4' />
                            <span className='font-black dark:text-blue-300 text-2xl'>Movies</span>
                        </div>
                        <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {movieData !== null && movieData.map((res) => (
                                <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                    <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                        <div className='h-64 w-full absolute inset-0 bg-gradient-to-b from-transparent to-black mix-blend-multiply'></div>
                                        <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                        <div className='absolute bottom-0 left-0 right-0 px-2 py-2 leading-tight'>
                                            <span className='text-xs font-semibold text-white'>{truncateText(res.title, 20)}</span><br />
                                            <span className='text-xs text-white bg-blue-300 rounded-sm px-2'>{res.score}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <img
                    className='lg:fixed lg:block hidden bottom-0 right-0 mb-4 mr-4 -mb-10 -mr-10 h-56 w-56 rounded-full object-cover hover:transform duration-300 hover:-translate-y-2'
                    src={catimg2}
                    alt='cat'
                />
            </div>
        </>
    );
};

export default Home;

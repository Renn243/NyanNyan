import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import catimg2 from './Image/cat2.png';
import Paw from './Image/paw.png';

const Home = () => {
    const [ongoingData, setOngoingData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [finishedData, setFinishedData] = useState([]);

    useEffect(() => {
        axios.get('/anime/ongoing?order_by=latest&page=1')
            .then((res) => setOngoingData(res.data.ongoingAnime))
            .catch((error) => console.error('Error fetching ongoing anime data:', error));

        axios.get('/anime/ongoing?order_by=popular&page=1')
            .then((res) => setPopularData(res.data.ongoingAnime))
            .catch((error) => console.error('Error fetching popular anime data:', error));

        axios.get('/anime/movie?order_by=latest&page=1')
            .then((res) => setMovieData(res.data.movieAnime))
            .catch((error) => console.error('Error fetching movie data:', error));

        axios.get('/anime/finished?order_by=latest&page=1')
            .then((res) => setFinishedData(res.data.finishedAnime))
            .catch((error) => console.error('Error fetching movie data:', error));
    }, []);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    const renderOngoingItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/4 p-2'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <div className='h-96 w-full absolute inset-0 bg-gradient-to-b from-transparent to-black mix-blend-multiply'></div>
                <img className='h-96 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md bg-blue-100 rounded-sm p-1'>{res.episode}</h3>
                <h3 className='absolute bottom-0 right-0 text-md bg-blue-300 rounded-sm p-1'>{res.type}</h3>
            </div>
            <h1 className='text-md font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const renderFinishedItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/4 p-2'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <div className='h-96 w-full absolute inset-0 bg-gradient-to-b from-transparent to-black mix-blend-multiply'></div>
                <img className='h-96 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md bg-blue-100 rounded-sm p-1'>{res.score}</h3>
                <h3 className='absolute bottom-0 right-0 text-md bg-blue-300 rounded-sm p-1'>{res.type}</h3>
            </div>
            <h1 className='text-md font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const renderPopularItem = (res) => (

        <div className='w-full bg-white shadow relative overflow-hidden'>
            <div className='h-96 w-full absolute inset-0 bg-gradient-to-l from-transparent via-black/80 to-black mix-blend-multiply'></div>
            <img className='h-96 w-full object-cover' src={res.image} alt={res.title} />
            <div className='absolute top-1/2 left-40 transform -translate-y-1/2 pr-4 leading-10'>
                <span className='text-xl font-black text-white'>{res.title}</span><br />
                <span className='text-lg text-white rounded-sm px-2'>{res.episode}</span><span className='text-white'>|</span>
                <span className='text-lg text-white rounded-sm px-2'>{res.type}</span><br />
                <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='min-w-full'>
                    <button className='bg-blue-300 rounded-lg px-2 mt-5 font-semibold'>Watch Now!</button>
                </Link>
            </div>
        </div >

    );

    return (
        <div className='bg-gray-100 dark:bg-black'>
            <div className='relative overflow-hidden'>
                <Slider
                    data={popularData.slice(0, 3)}
                    itemsPerPage={1}
                    renderItem={renderPopularItem}
                />
            </div>

            <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center mb-2'>
                        <img src={Paw} className='w-6 h-6 mr-4' />
                        <span className='font-black dark:text-blue-300 text-2xl'>Ongoing Anime</span>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />

                    <Slider
                        data={ongoingData}
                        itemsPerPage={4}
                        renderItem={renderOngoingItem}
                        showSeeMore={true}
                    />
                </div>

                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center mb-2'>
                        <img src={Paw} className='w-6 h-6 mr-4' />
                        <span className='font-black dark:text-blue-300 text-2xl'>Finished Anime</span>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />

                    <Slider
                        data={finishedData}
                        itemsPerPage={4}
                        renderItem={renderFinishedItem}
                        showSeeMore={true}
                    />
                </div>

                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full'>
                    <div className='flex flex-row items-center mb-2'>
                        <img src={Paw} className='w-6 h-6 mr-4' />
                        <span className='font-black dark:text-blue-300 text-2xl'>Movies Anime</span>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {movieData.slice(0, 7).map((res) => (
                            <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                    <div className='h-64 w-full absolute inset-0 bg-gradient-to-b from-transparent to-black mix-blend-multiply'></div>
                                    <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                    <h3 className='absolute bottom-0 left-0 px-2 py-2 text-md font-semibold text-white'>{truncateText(res.title, 20)}</h3>
                                    <div className='absolute top-0 left-0 px-2 py-2'>
                                        <span className='text-xs font-semibold bg-blue-100 rounded-sm px-2'>{res.score}</span>
                                        <span className='text-xs font-semibold bg-blue-300 rounded-sm px-2 mx-2'>{res.type}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {movieData.length > 7 && (
                            <div className='flex flex-col bg-blue-100 rounded-md items-center justify-center bg'>
                                <img className='h-16 w-16' src={Paw} alt='Logo' />
                                <span className='font-semibold'>See More</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <img
                className='lg:fixed lg:block hidden bottom-0 right-0 mb-4 mr-4 -mb-10 -mr-10 h-56 w-56 rounded-full object-cover hover:transform duration-300 hover:-translate-y-2'
                src={catimg2}
                alt='cat'
            />
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Schedule = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    useEffect(() => {
        const fetchAnimeData = async () => {
            setLoading(true);
            try {
                const currentDays = days.slice(currentDayIndex, currentDayIndex + 3);
                const promises = currentDays.map(day =>
                    axios.get(`https://anime.exoream.my.id/anime/schedule?scheduled_day=${day}&page=${currentPage}`)
                );
                const responses = await Promise.all(promises);
                const fetchedData = responses.map(res => res.data.scheduleAnime);
                setAnimeData(fetchedData);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, [currentPage, currentDayIndex]);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    const handleNext = () => {
        if (currentDayIndex < days.length - 3) {
            setCurrentDayIndex(currentDayIndex + 3);
            setCurrentPage(1);
        }
    };

    const handlePrev = () => {
        if (currentDayIndex > 0) {
            setCurrentDayIndex(currentDayIndex - 3);
            setCurrentPage(1);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center justify-between mb-20'>
                        <button
                            onClick={handlePrev}
                            disabled={currentDayIndex === 0}
                            className='font-semibold p-2 bgColorSecond rounded-md'
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path>
                            </svg>
                        </button>
                        <span className='font-black dark:text-white text-2xl capitalize'>
                            Anime Schedule
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentDayIndex >= days.length - 3}
                            className='font-semibold p-2 bgColorSecond rounded-md'
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
                            </svg>
                        </button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {animeData.map((dayData, index) => (
                            <div key={index} className='relative'>
                                <h2 className='font-bold text-lg dark:text-white capitalize mb-4'>{days[currentDayIndex + index]}</h2>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mr-10'>
                                    {dayData.map((res) => (
                                        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                            <div className='relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                                <img className='h-32 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                                <div className='absolute bottom-0 left-0 flex flex-row gap-2'>
                                                    <h3 className='text-xs font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.day}</h3>
                                                    <h3 className='text-xs font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.time}</h3>
                                                </div>
                                            </div>
                                            <h1 className='text-xs dark:text-white font-semibold pt-3'>{truncateText(res.title, 15)}</h1>
                                            <h3 className='text-xs text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
                                        </Link>
                                    ))}
                                </div>
                                {index < animeData.length - 1 && (
                                    <div className='absolute top-0 right-0 h-full border-2 border-yellow-300'></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;

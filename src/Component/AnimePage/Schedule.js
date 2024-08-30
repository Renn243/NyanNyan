import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Schedule = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentDay, setCurrentDay] = useState('monday');

    useEffect(() => {
        const fetchAnimeData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://anime.exoream.my.id/anime/schedule?scheduled_day=${currentDay}&page=${currentPage}`);
                setAnimeData(res.data.scheduleAnime);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, [currentPage, currentDay]);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    const handleDayChange = (event) => {
        setCurrentDay(event.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <span className='font-black dark:text-white text-2xl capitalize'>{currentDay} Anime</span>
                        <select
                            value={currentDay}
                            onChange={handleDayChange}
                            className='font-semibold rounded-md p-2 bgColorSecond'
                        >
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                        {animeData.map((res) => (
                            <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                <div className='w-full relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                    <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                    <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.time}</h3>
                                </div>
                                <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 15)}</h1>
                                <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;

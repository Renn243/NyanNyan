import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const AnimeList = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://anime.exoream.my.id/anime/list?page=${currentPage}`);
                setAnimeData(res.data.listAnime);
                setHasNextPage(res.data.nextPage);
                setHasPrevPage(res.data.prevPage);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
            };

            fetchData();
        }
    }, [currentPage]);

    const groupDataByAlphabet = (data) => {
        return data.reduce((acc, item) => {
            const firstLetter = item.title[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
            return acc;
        }, {});
    };

    const handlePrevPage = () => {
        if (hasPrevPage) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const groupedData = groupDataByAlphabet(animeData);
    const sortedKeys = Object.keys(groupedData).sort();

    return (
        <div className='bg-gray-100 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <h2 className='font-black dark:text-white text-2xl mb-4'>Anime List</h2>
                    <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />
                    <div>
                        {sortedKeys.map((letter) => (
                            <div key={letter} className='mb-8'>
                                <h3 className='text-2xl text-white font-bold'>{letter}</h3>
                                <ul className='mt-2'>
                                    {groupedData[letter].map((res) => (
                                        <li key={res.url} className='mt-2'>
                                            <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='text-blue-300 hover:underline'>
                                                {res.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-center mt-8 gap-4'>
                        <button
                            onClick={handlePrevPage}
                            disabled={!hasPrevPage}
                            className={`p-2 rounded-full shadow-lg ${hasPrevPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                        <button
                            onClick={handleNextPage}
                            disabled={!hasNextPage}
                            className={`p-2 rounded-full shadow-lg ${hasNextPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                </div>
            </div>
        </div>
    );
};

export default AnimeList;

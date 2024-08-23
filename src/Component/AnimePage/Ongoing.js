import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import catimg2 from './Image/cat2.png';
import Paw from './Image/paw.png';
import Loading from './Loading';

const Ongoing = () => {
    const [ongoingData, setOngoingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    useEffect(() => {
        axios.get(`/anime/ongoing?order_by=latest&page=${currentPage}`)
            .then((res) => {
                setOngoingData(res.data.ongoingAnime);
                setHasNextPage(res.data.nextPage);
                setHasPrevPage(res.data.prevPage);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching ongoing anime data:', error);
                setLoading(false);
            });
    }, [currentPage]);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

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

    return (
        <div className='bg-gray-100 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center mb-2'>
                        <span className='font-black dark:text-white text-2xl'>Ongoing Anime</span>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg mb-8' />

                    {loading ? (
                        <div className='text-center text-gray-600 dark:text-gray-400'>Loading...</div>
                    ) : (
                        <>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                                {ongoingData.length > 0 ? ongoingData.map((res) => (
                                    <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                        <div className='w-full bg-white dark:bg-gray-700 shadow relative overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-2'>                                            <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                            <h3 className='absolute bottom-0 left-0 px-2 py-2 text-xs font-semibold text-white'>
                                                {truncateText(res.title, 20)}
                                            </h3>
                                            <div className='absolute top-0 left-0 px-2 py-2'>
                                                <span className='text-xs font-semibold bg-blue-100 dark:bg-blue-100 rounded-sm px-2'>{res.episode}</span>
                                                <span className='text-xs font-semibold bg-blue-300 dark:bg-blue-300 rounded-sm px-2 mx-2'>{res.type.join(', ')}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className='text-center text-gray-600 dark:text-gray-400'>No ongoing anime found.</div>
                                )}
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
                        </>
                    )}
                </div>
            </div>

            <img
                className='lg:fixed lg:block hidden bottom-0 right-0 mb-4 mr-4 -mb-10 -mr-10 h-56 w-56 rounded-full object-cover transition-transform duration-300 hover:-translate-y-2'
                src={catimg2}
                alt='cat'
            />
        </div>
    );
};

export default Ongoing;

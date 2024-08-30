import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import Loading from './Loading';

const MoreAnime = () => {
    const { type } = useParams();
    const { search, pathname } = useLocation();
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [orderBy, setOrderBy] = useState('popular');

    const queryParams = new URLSearchParams(search);
    const data = queryParams.get('data') || 'ongoingAnime';

    const getApiUrl = () => {
        const isGenrePath = pathname.includes('/genre/');
        console.log('Is Genre Path:', isGenrePath);

        if (isGenrePath) {
            return `https://anime.exoream.my.id/anime/properties/genre/${type}?order_by=${orderBy}&page=${currentPage}`;
        } else {
            return `https://anime.exoream.my.id/anime/${type}?order_by=${orderBy}&page=${currentPage}`;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(getApiUrl());
                if (res.data && res.data[data]) {
                    setAnimeData(res.data[data]);
                    setHasNextPage(res.data.nextPage);
                    setHasPrevPage(res.data.prevPage);
                } else {
                    setAnimeData([]);
                }
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, data, currentPage, orderBy]);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    const handlePrevPage = () => {
        if (hasPrevPage) {
            setCurrentPage((prev) => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage((prev) => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleOrderChange = (event) => {
        setOrderBy(event.target.value);
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
                        <span className='font-black dark:text-white text-2xl capitalize'>{type} Anime</span>
                        <select
                            value={orderBy}
                            onChange={handleOrderChange}
                            className='font-semibold rounded-md p-2 bgColorSecond'
                        >
                            <option value="popular">Popular</option>
                            <option value="latest">Latest</option>
                            <option value="most_viewed">Most Viewed</option>
                            <option value="oldest">Oldest</option>
                            <option value="updated">Updated</option>
                        </select>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                        {animeData.map((res) => (
                            <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                <div className='w-full relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                    <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                    <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
                                </div>
                                <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 15)}</h1>
                                <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
                            </Link>
                        ))}
                    </div>

                    <div className='flex justify-center mt-8 gap-4'>
                        <button
                            onClick={handlePrevPage}
                            disabled={!hasPrevPage}
                            className={`p-2 rounded-full shadow-lg ${hasPrevPage ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                            className={`p-2 rounded-full shadow-lg ${hasNextPage ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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

export default MoreAnime;

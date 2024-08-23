import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import catimg2 from './Image/cat2.png';
import Paw from './Image/paw.png';
import Loading from './Loading';

const Home = () => {
    const [ongoingData, setOngoingData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [finishedData, setFinishedData] = useState([]);
    const [animeDetails, setAnimeDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ongoingRes, popularRes, movieRes, finishedRes] = await Promise.all([
                    axios.get('/anime/ongoing?order_by=updated&page=1'),
                    axios.get('/anime/ongoing?order_by=popular&page=1'),
                    axios.get('/anime/movie?order_by=updated&page=1'),
                    axios.get('/anime/finished?order_by=updated&page=1')
                ]);

                setOngoingData(ongoingRes.data.ongoingAnime);
                setPopularData(popularRes.data.ongoingAnime);
                setMovieData(movieRes.data.movieAnime);
                setFinishedData(finishedRes.data.finishedAnime);

                const topThreeData = popularRes.data.ongoingAnime.slice(0, 3);
                const requests = topThreeData.map((anime) => {
                    const { animeCode, animeId } = anime;
                    return axios.get(`/anime/${animeCode}/${animeId}`)
                        .then((response) => ({
                            animeCode,
                            details: response.data.animeDetails,
                        }));
                });

                const results = await Promise.all(requests);
                const details = results.reduce((acc, { animeCode, details }) => {
                    acc[animeCode] = details;
                    return acc;
                }, {});

                setAnimeDetails(details);
                setDetailsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setDetailsLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const truncateText = (text = '', maxLength) => {
        if (typeof text !== 'string') {
            return '';
        }
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    if (loading || detailsLoading) {
        return <Loading />;
    }

    const renderOngoingItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md bg-blue-100 rounded-sm p-1'>{res.episode}</h3>
                <h3 className='absolute bottom-0 right-0 text-md bg-blue-300 rounded-sm p-1'>{res.type}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const renderFinishedItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/4 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-96 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md bg-blue-100 rounded-sm p-1'>{res.score}</h3>
                <h3 className='absolute bottom-0 right-0 text-md bg-blue-300 rounded-sm p-1'>{res.type}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const renderPopularItem = (res) => {
        const details = animeDetails[res.animeCode] || {};

        return (
            <div className='relative w-full bg-white shadow overflow-hidden'>
                <img className='absolute inset-0 h-[32rem] w-full object-cover' src={res.image} alt={res.title} />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent mix-blend-multiply'></div>
                <div className='relative flex top-1/2 left-0 px-40 transform -translate-y-1/2 leading-10 gap-20 items-center z-10'>
                    <img className='h-[32rem] w-96 rounded-lg object-cover m-10 transform rotate-12 shadow-lg shadow-blue-300' src={res.image} alt={res.title} />
                    <div className='text-white'>
                        <span className='text-xl font-black'>{res.title}</span><br />
                        <span className='text-lg text-blue-300'>{res.episode}</span><span className='text-white'> | </span>
                        <span className='text-lg text-blue-100'>{res.type}</span><br />
                        <p className='text-lg'>{truncateText(details.synopsis, 500)}</p>
                        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='block mt-5'>
                            <button className='flex flex-row items-center bg-blue-300 text-black rounded-lg px-4 py-2 font-semibold duration-300 hover:scale-125'>
                                <svg
                                    className='w-6 h-6'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 3l14 9-14 9V3z'></path>
                                </svg>
                                Watch Now!</button>
                        </Link>
                    </div>
                </div>
            </div>

        );
    };

    return (
        <div className='bg-gray-100 dark:bg-black'>
            <div className='relative overflow-hidden'>
                <Slider
                    data={popularData.slice(0, 3)}
                    itemsPerPage={1}
                    renderItem={renderPopularItem}
                />
            </div>

            <div className='pt-36 pb-16 px-40'>
                <div className='w-full mb-16'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Ongoing Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <button className='outline outline-2  outline-blue-300 text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                        </div>
                        {/* <span className='text-white'>Ikuti perkembangan anime yang sedang berlangsung!</span> */}
                    </div>

                    <Slider
                        data={ongoingData}
                        itemsPerPage={5}
                        renderItem={renderOngoingItem}
                        showSeeMore={true}
                        seeMoreLink="/Ongoing"
                    />
                </div>

                <div className='w-full mb-16'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Finished Anime</h3>
                            <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' />
                            <button className='outline outline-2 outline-blue-300 text-white px-200 text-sm font-semibold w-48 py-2 rounded-lg shadow-md'>View More</button>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <Slider
                        data={finishedData}
                        itemsPerPage={4}
                        renderItem={renderFinishedItem}
                        showSeeMore={true}
                    />
                </div>

                <div className='w-full mb-16'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-center gap-5'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Movies Anime</h3>
                            <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' />
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-16'>
                        {movieData.slice(0, 7).map((res) => (
                            <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
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
                            <div className='flex flex-col bg-blue-100 rounded-md items-center justify-center'>
                                <img className='h-16 w-16' src={Paw} alt='Paw icon' />
                                <span className='font-semibold'>See More</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <img
                className='lg:fixed lg:block hidden bottom-0 right-0 mb-4 mr-4 -mb-10 -mr-10 h-56 w-56 rounded-full object-cover hover:transform duration-300 hover:-translate-y-2'
                src={catimg2}
                alt='Cat'
            />
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import catimg2 from './Image/cat2.png';
import Nyan from './Image/Nyan.png';
import Paw from './Image/paw.png';
import Loading from './Loading';
import nyan2 from './Image/3.png';
import nyan3 from './Image/4.png';
import hellow from './Image/hellow.png';

const Home = () => {
    const [ongoingData, setOngoingData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [finishedData, setFinishedData] = useState([]);
    const [summerData, setSummerData] = useState({});
    const [animeDetails, setAnimeDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [actionData, setActionData] = useState({});
    const [comedyData, setComedyData] = useState({});
    const [romanceData, setRomanceData] = useState({});
    const [chinaData, setChinaData] = useState({});
    const [currentImage, setCurrentImage] = useState(catimg2);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ongoingRes, popularRes, movieRes, finishedRes, summerRes, actionRes, comedyRes, romanceRes, chinaRes] = await Promise.all([
                    axios.get('https://anime.exoream.my.id/anime/ongoing?order_by=updated&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/summer?order_by=popular&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/movie?order_by=updated&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/finished?order_by=updated&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/summer?order_by=popular&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/properties/genre/action?order_by=popular&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/properties/genre/comedy?order_by=popular&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/properties/genre/romance?order_by=popular&page=1'),
                    axios.get('https://anime.exoream.my.id/anime/properties/country/cn?order_by=popular&page=1')
                ]);

                setOngoingData(ongoingRes.data.ongoingAnime);
                setPopularData(popularRes.data.summerAnime);
                setMovieData(movieRes.data.movieAnime);
                setSummerData(summerRes.data.summerAnime);
                setFinishedData(finishedRes.data.finishedAnime);
                setActionData(actionRes.data.propertiesDetails);
                setComedyData(comedyRes.data.propertiesDetails);
                setRomanceData(romanceRes.data.propertiesDetails);
                setChinaData(chinaRes.data.propertiesDetails);


                const topThreeData = popularRes.data.summerAnime.slice(0, 6);
                console.log(topThreeData)
                const requests = topThreeData.map((anime) => {
                    const { animeCode, animeId } = anime;
                    return axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}`)
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition >= 200 && scrollPosition < 1000) {
            setCurrentImage(hellow);
        } else if (scrollPosition >= 1000 && scrollPosition < 1800) {
            setCurrentImage(catimg2);
        } else if (scrollPosition >= 1800 && scrollPosition < 2600) {
            setCurrentImage(hellow);
        } else {
            setCurrentImage(catimg2);
        }
    };

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
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.episode}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderSummerItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/4 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderFinishedItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/4 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.score}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderActionItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderComedyItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/4 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderRomanceItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderChinaItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    function filterText(text) {
        const filterPattern = /\(Sumber:.*$/;
        return text.replace(filterPattern, '').trim();
    }


    const renderPopularItem = (res) => {
        const details = animeDetails[res.animeCode] || {};

        return (
            <div className='relative w-full bg-white shadow overflow-hidden'>
                <img className='absolute inset-0 h-[32rem] w-full object-cover' src={res.image} alt={res.title} />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent mix-blend-multiply'></div>
                <div className='relative flex top-1/2 left-0 px-40 transform -translate-y-1/2 leading-10 gap-20 items-center z-10'>
                    <img className='h-[32rem] w-96 rounded-lg object-cover m-10 transform rotate-12 shadow-lg shadow-yellow-300' src={res.image} alt={res.title} />
                    <div className='text-white'>
                        <span className='text-xl font-black'>{res.title}</span><br />
                        <span className='text-lg text-gray-400'>{res.episode}</span><span className='text-white'> | </span>
                        <span className='text-lg text-gray-400'>{res.type.join(', ')}</span><br />
                        <p className='text-lg'>{truncateText(filterText(details.synopsis), 500)}</p>
                        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='block mt-5'>
                            <button className='flex flex-row items-center bgColorSecond text-black rounded-lg px-4 py-2 font-semibold duration-300 hover:scale-125'>
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
        <div className='bgColorPrimary3 dark:bg-black'>
            <div className='relative overflow-hidden'>
                <Slider
                    data={popularData.slice(0, 6)}
                    itemsPerPage={1}
                    renderItem={renderPopularItem}
                />
            </div>

            <div className='pt-36 pb-16 px-40'>
                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <div className='font-black dark:text-white text-2xl w-1/2'>
                                <h3>Ongoing Anime</h3>
                            </div>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/ongoing?data=ongoingAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>
                                    View More
                                </button>
                            </Link>
                        </div>
                    </div>


                    <Slider
                        data={ongoingData}
                        itemsPerPage={5}
                        renderItem={renderOngoingItem}
                        showSeeMore={true}
                        seeMoreLink="/more/ongoing?data=ongoingAnime"
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <img src={nyan2} alt='Nyan' className='absolute right-0 opacity-50 h-52' />
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Summer Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/summer?data=summerAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={summerData}
                        itemsPerPage={5}
                        renderItem={renderSummerItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Action Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/genre/action?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={actionData}
                        itemsPerPage={5}
                        renderItem={renderActionItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Comedy Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/genre/comedy?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={comedyData}
                        itemsPerPage={5}
                        renderItem={renderComedyItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <img src={nyan3} alt='Nyan' className='absolute left-0 opacity-50 h-52' />
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Romance Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/genre/romance?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={romanceData}
                        itemsPerPage={5}
                        renderItem={renderRomanceItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Finished Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/finished?data=finishedAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <Slider
                        data={finishedData}
                        itemsPerPage={4}
                        renderItem={renderFinishedItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>China Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/country/cn?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <Slider
                        data={chinaData}
                        itemsPerPage={5}
                        renderItem={renderChinaItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-8 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-5'>
                            <h3 className='font-black dark:text-white text-2xl w-1/2'>Movies Anime</h3>
                            {/* <hr className='w-full h-1 bg-black dark:bg-blue-300 rounded-lg' /> */}
                            <Link to="/more/movie?data=movieAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-8'>
                        {movieData.slice(0, 8).map((res) => (
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
                        {/* {movieData.length > 7 && (
                            <div className='flex flex-col bg-blue-100 rounded-md items-center justify-center'>
                                <img className='h-16 w-16' src={Paw} alt='Paw icon' />
                                <span className='font-semibold'>See More</span>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center w-full'>
                <img src={Nyan} alt='Nyan' className='w-96 mx-auto' />
            </div>
            <img
                className='lg:fixed lg:block hidden bottom-0 right-0 mb-4 -mb-10 -mr-10 h-56 hover:transform duration-300 hover:-translate-y-2'
                src={currentImage}
                alt='Cat'
            />
        </div>
    );
};

export default Home;

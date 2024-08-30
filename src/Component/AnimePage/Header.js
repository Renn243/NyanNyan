import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Image/Logo2.png';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        document.documentElement.classList.toggle('dark', savedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="bgColorPrimary2">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex flex-row gap-20'>
                    <div className="absolute left-0 top-0 overflow-visible z-10">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-40"
                        />
                    </div>

                    <ul className="font-medium textColorSecond flex flex-col items-center p-4 ml-6 md:p-0 md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 duration-300 hover:scale-125"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/AnimeList"
                                className="block py-2 px-3 duration-300 hover:scale-125"
                                aria-current="page"
                            >
                                Anime List
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Category"
                                className="block py-2 px-3 duration-300 hover:scale-125"
                                aria-current="page"
                            >
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Schedule"
                                className="block py-2 px-3 duration-300 hover:scale-125"
                                aria-current="page"
                            >
                                Schedule
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center space-x-2">
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 457.32 457.32'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d="M228.66,112.692c-63.945,0-115.968,52.022-115.968,115.967c0,63.945,52.023,115.968,115.968,115.968 s115.968-52.023,115.968-115.968C344.628,164.715,292.605,112.692,228.66,112.692z"
                            stroke="black"
                            strokeWidth="2"
                            fill="white"
                        />
                        <path
                            d="M401.429,228.66l42.467-57.07c2.903-3.9,3.734-8.966,2.232-13.59c-1.503-4.624-5.153-8.233-9.794-9.683 l-67.901-21.209l0.811-71.132c0.056-4.862-2.249-9.449-6.182-12.307c-3.934-2.858-9.009-3.633-13.615-2.077l-67.399,22.753 L240.895,6.322C238.082,2.356,233.522,0,228.66,0c-4.862,0-9.422,2.356-12.235,6.322l-41.154,58.024l-67.4-22.753 c-4.607-1.555-9.682-0.781-13.615,2.077c-3.933,2.858-6.238,7.445-6.182,12.307l0.812,71.132l-67.901,21.209 c-4.641,1.45-8.291,5.059-9.793,9.683c-1.503,4.624-0.671,9.689,2.232,13.59l42.467,57.07l-42.467,57.07 c-2.903,3.9-3.734,8.966-2.232,13.59c1.502,4.624,5.153,8.233,9.793,9.683l67.901,21.208l-0.812,71.132 c-0.056,4.862,2.249,9.449,6.182,12.307c3.934,2.857,9.007,3.632,13.615,2.077l67.4-22.753l41.154,58.024 c2.813,3.966,7.373,6.322,12.235,6.322c4.862,0,9.422-2.356,12.235-6.322l41.154-58.024l67.399,22.753 c4.606,1.555,9.681,0.781,13.615-2.077c3.933-2.858,6.238-7.445,6.182-12.306l-0.811-71.133l67.901-21.208 c4.641-1.45,8.291-5.059,9.794-9.683c1.502-4.624,0.671-9.689-2.232-13.59L401.429,228.66z M228.66,374.627 c-80.487,0-145.968-65.481-145.968-145.968S148.173,82.692,228.66,82.692s145.968,65.48,145.968,145.967 S309.147,374.627,228.66,374.627z"
                            stroke="black"
                            strokeWidth="2"
                            fill="white"
                        />
                    </svg>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                        />
                        <div className="w-11 h-6 bg-gray-600 hover:bg-yellow-500 rounded-full duration-300"></div>
                        <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 dark:translate-x-5 translate-x-0`}></span>
                    </label>

                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 292.299 292.299'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d="M153.699,292.138C68.95,292.138,0,223.185,0,138.439C0,79.742,32.675,27.002,85.28,0.807 c2.369-1.174,5.215-0.718,7.077,1.144c1.864,1.864,2.345,4.711,1.183,7.074C83.941,28.527,79.077,49.496,79.077,71.33 c0,77.972,63.432,141.407,141.395,141.407c22.08,0,43.247-4.978,62.942-14.777c2.366-1.177,5.213-0.721,7.074,1.141 c1.873,1.867,2.342,4.714,1.177,7.073C265.61,259.195,212.738,292.138,153.699,292.138z"
                            stroke="black"
                            strokeWidth="2"
                            fill="white"
                        />
                    </svg>
                </div>

                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <div className="relative">
                        <input
                            type="search"
                            id="title-search"
                            className="block w-full p-2.5 text-sm bg-gray-600 rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500 text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                        >
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                    </div>
                </form>
            </div>
        </nav >
    );
};

export default Header;

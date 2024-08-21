import React, { useState } from 'react';
import Logo1 from './Image/Logo.png';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <nav className="bg-blue-300 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="relative flex items-center justify-center">
                    <img
                        src={Logo1}
                        alt="Logo"
                        className="w-10 h-10 object-cover"
                    />
                    <span className="absolute font-bold text-white">NyanNyan</span>
                </div>
                <ul className="font-medium flex flex-col items-center dark:text-white p-4 md:p-0 md:flex-row md:space-x-8 md:mt-0">
                    <li>
                        <a
                            href="/#home"
                            className="block py-2 px-3 hover:text-blue-600 duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/#anime-list"
                            className="block py-2 px-3 hover:text-blue-600 duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            Anime List
                        </a>
                    </li>
                </ul>

                <div className="flex items-center space-x-2">
                    <span className={`text-sm dark:text-white dark:white`}>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full dark:bg-gray-600 duration-300"></div>
                        <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 dark:translate-x-5 translate-x-0`}></span>
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    <div className='relative'>
                        <input
                            type='search'
                            id='title-search'
                            className='block w-full py-2 pl-3 pr-4 text-sm border-2 border-gray-600 dark:bg-gray-600 rounded-lg bg-blue-200 focus:outline-none'
                            placeholder='Search by Title'
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;

import React, { useState } from 'react';
import Paw from './Image/paw.png';
import { Link } from 'react-router-dom';

const Slider = ({ data, itemsPerPage, renderItem, onNext, onPrev, showSeeMore, seeMoreLink }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = Math.ceil(data.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        if (onNext) onNext();
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
        if (onPrev) onPrev();
    };

    return (
        <div className='relative'>
            <div className='overflow-hidden'>
                <div
                    className='flex'
                    style={{
                        width: `${totalSlides * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                        transition: 'transform 0.5s ease',
                    }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            className='flex'
                            style={{ width: `${100 / totalSlides}%` }}
                        >
                            {data.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map(renderItem)}
                            {slideIndex === totalSlides - 1 && showSeeMore && (
                                <Link
                                    className='flex flex-col items-center justify-center relative overflow-hidden rounded-lg cursor-pointer px-10 mx-2'
                                    to={seeMoreLink}
                                >
                                    <img className='h-16 w-16' src={Paw} alt="Logo" />
                                    <span className='text-xl font-semibold'>See More</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={prevSlide} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full font-black opacity-20 hover:opacity-60'>
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
            <button onClick={nextSlide} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full font-black opacity-20 hover:opacity-60'>
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
    );
};

export default Slider;

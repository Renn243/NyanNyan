import React, { useState } from 'react';
import Paw from './Image/paw.png';

const Slider = ({ data, itemsPerPage, renderItem, onNext, onPrev, showSeeMore, onSeeMoreClick }) => {
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
                                <div
                                    className='flex flex-col items-center justify-center relative overflow-hidden rounded-lg cursor-pointer px-10 mx-2'
                                    onClick={onSeeMoreClick}
                                >
                                    <img className='h-16 w-16' src={Paw} alt="Logo" />
                                    <span className='text-xl font-semibold'>See More</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={prevSlide} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full font-black opacity-20 hover:opacity-60'>
                &lt;
            </button>
            <button onClick={nextSlide} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full font-black opacity-20 hover:opacity-60'>
                &gt;
            </button>
        </div>
    );
};

export default Slider;

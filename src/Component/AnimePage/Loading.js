import React from 'react';
import catimg2 from './Image/cat2.png';

const Loading = () => {
    return (
        <div className='flex flex-col dark:bg-black items-center justify-center min-h-screen'>
            <div className='text-center'>
                <img className='h-56 w-56 rounded-full spin' src={catimg2} alt='Loading' />
                <span className='font-bold'>Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
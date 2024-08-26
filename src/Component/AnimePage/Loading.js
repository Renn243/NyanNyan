import React from 'react';
import catimg2 from './Image/cat2.png';

const Loading = () => {
    return (
        <div className='flex flex-col bgColorPrimary3 dark:bg-black items-center justify-center min-h-screen'>
            <img className='h-56 rounded-full spin' src={catimg2} alt='Loading' />
        </div>
    );
};

export default Loading;
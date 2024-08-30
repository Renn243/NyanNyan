import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Genre = () => {
    const [genreData, setGenreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('genre');

    useEffect(() => {
        const fetchGenres = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://anime.exoream.my.id/anime/properties/${category}`);
                setGenreData(res.data.propertiesAnime);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, [category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <span className='font-black dark:text-white text-2xl capitalize'>Anime Category</span>
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className='font-semibold rounded-md p-2 bgColorSecond'
                        >
                            <option value="genre">Genre</option>
                            <option value="season">Season</option>
                            <option value="studio">Studio</option>
                            <option value="type">Type</option>
                            <option value="country">Country</option>
                        </select>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
                        {genreData.map((res) => (
                            <Link
                                to={`/more/${category}/${res.propertiesId}?data=propertiesDetails`}
                                className='bgColorSecond text-sm font-semibold p-4 rounded-lg hover:bg-yellow-600'
                            >
                                {res.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Genre;

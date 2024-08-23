import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import '../../App.css';

const Detail = () => {
    const { animeCode, animeId } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        axios.get(`/anime/${animeCode}/${animeId}`)
            .then((res) => {
                setAnime(res.data.animeDetails);
            })
            .catch((error) => {
                console.error('Error fetching anime details:', error);
            });
    }, [animeCode, animeId]);

    if (!anime) {
        return <Loading />;
    }

    return (
        <div className='bg-gray-100 dark:bg-black'>
            <div className='flex flex-row mx-auto pb-20 pt-10 lg:px-40 px-10 gap-10'>
                <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <h2 className="text-lg lg:text-xl mb-2">
                        <span className="inline-block bg-blue-300 font-bold dark:text-gray-800 text-white rounded-lg px-3 py-1">Detail</span>
                    </h2>
                    <table className="w-full text-left dark:text-gray-400">
                        <tbody>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Tipe</th>
                                <td className="px-3 py-3">{anime.type}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Episode</th>
                                <td className="px-3 py-3">{anime.episode}</td>
                            </tr>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Status</th>
                                <td className="px-3 py-3">{anime.status}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Tayang</th>
                                <td className="px-3 py-3">{anime.released}</td>
                            </tr>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Musim</th>
                                <td className="px-3 py-3">{anime.season}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Durasi</th>
                                <td className="px-3 py-3">{anime.duration}</td>
                            </tr>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Genre</th>
                                <td className="px-3 py-3">{anime.genres.join(' ')}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Studio</th>
                                <td className="px-3 py-3">{anime.studio}</td>
                            </tr>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Rating</th>
                                <td className="px-3 py-3">{anime.score}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="pb-6 pt-8">
                        <h2 className="text-lg lg:text-xl mb-2">
                            <span className="inline-block bg-blue-300 font-bold dark:text-gray-800 text-white rounded-lg px-3 py-1">Sinopsis</span>
                        </h2>
                        <span className='dark:text-gray-400'>
                            {anime.synopsis}
                        </span>
                    </div>

                    <div className="pt-8">
                        <h2 className="text-lg lg:text-xl mb-8">
                            <span className="inline-block bg-blue-300 text-white dark:text-gray-800 font-bold rounded-lg px-3 py-1">Episodes</span>
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {anime.episodeList.map((episode, index) => (
                                <Link
                                    key={index}
                                    to={`/anime/${animeCode}/${animeId}/${index + 1}`}
                                    className="bg-blue-100 py-2 px-4 font-bold rounded-lg hover:text-white hover:bg-blue-400 transition-colors"
                                >
                                    {episode.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 rounded-xl lg:ml-4 mt-4 pl-8 lg:mt-0">
                    <img
                        className="object-cover object-center w-full h-auto rounded-xl"
                        id="animeimg"
                        src={anime.image}
                        alt={anime.title}
                    />
                    <div className="mt-4">
                        <h1 className="text-2xl lg:text-3xl mb-2 lg:mb-4 text-gray-600 dark:text-gray-400 font-black rounded-lg">
                            {anime.title}
                        </h1>
                        <span className='dark:text-white'>{anime.alternativeTitles}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;

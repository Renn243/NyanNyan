import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';

const Video = () => {
    const { animeCode, animeId, episodeNumber } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [animeData, setAnimeData] = useState({ episodeList: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const episodeRes = await axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}/${episodeNumber}`);
                setEpisode(episodeRes.data);
                setVideoList(episodeRes.data.videoList);

                const animeRes = await axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}`);
                setAnimeData(animeRes.data.animeDetails);
                setSelectedVideo(episodeRes.data.videoList[0]);
            } catch (err) {
                console.error('Error fetching episode details:', err);
            }
        };

        fetchData();
    }, [animeCode, animeId, episodeNumber]);

    const handleVideoChange = (e) => {
        const selectedUrl = e.target.value;
        const video = videoList.find(v => v.url === selectedUrl);
        if (video) {
            setSelectedVideo(video);
        } else {
            console.error('Video not found for URL:', selectedUrl);
        }
    };

    const handleNavigateEpisode = (targetEpisode) => {
        navigate(`/anime/${animeCode}/${animeId}/${targetEpisode}`);
    };

    if (!episode) {
        return <Loading />;
    }

    return (
        <div className="flex flex-row dark:bg-black py-20 lg:px-40 px-10 gap-4">
            <div className='w-4/5'>
                <video className="w-full h-auto rounded-lg" controls key={selectedVideo ? selectedVideo.url : ''}>
                    <source src={selectedVideo ? selectedVideo.url : ''} type={selectedVideo ? selectedVideo.type : ''} />
                </video>
                <div className="mt-4">
                    <select
                        className="px-4 py-2 mr-2 bg-blue-300 dark:bg-black dark:outline dark:outline-2 dark:outline-blue-300 dark:text-white dark:hover:bg-blue-300 rounded-lg"
                        onChange={handleVideoChange}
                        value={selectedVideo ? selectedVideo.url : ''}
                    >
                        {videoList.length > 0 ? videoList.map((video, index) => (
                            <option key={index} value={video.url}>
                                {video.size}
                            </option>
                        )) : <option>No videos available</option>}
                    </select>

                    {episode.prevEpisodeNumber && (
                        <button
                            className="px-4 py-2 mr-2 bg-blue-100 dark:bg-black dark:outline dark:outline-2 dark:outline-blue-300 dark:text-white dark:hover:bg-blue-300 rounded-lg"
                            onClick={() => handleNavigateEpisode(episode.prevEpisodeNumber)}
                        >
                            Prev Episode
                        </button>
                    )}

                    {episode.nextEpisodeNumber && (
                        <button
                            className="px-4 py-2 bg-blue-100 dark:bg-black dark:outline dark:outline-2 dark:outline-blue-300 dark:text-white dark:hover:bg-blue-300 rounded-lg"
                            onClick={() => handleNavigateEpisode(episode.nextEpisodeNumber)}
                        >
                            Next Episode
                        </button>
                    )}
                </div>
                <div className='pt-10 dark:text-white'>
                    <div className='flex flex-row items-center gap-4'>
                        <img src={animeData.image} alt='Anime Image' className='h-32 w-32 rounded-lg' />

                        <div>
                            <h1 className="text-l lg:text-2xl mb-2 font-black text-gray-600 dark:text-white">{animeData.title}</h1>
                            <span className='font-semibold'>{animeData.type}</span><span> | </span><span className='font-semibold'>Episode {episodeNumber}</span><br />
                        </div>
                    </div>
                    <h5 className='pt-4 font-semibold'>Synopsis :</h5>
                    <p>{animeData.synopsis}</p>
                </div>
            </div>
            <div className='w-1/5 bg-gray-200 dark:bg-gray-900 p-5 rounded-lg h-96 shadow-md overflow-y-auto'>
                <h2 className="text-lg lg:text-xl mb-8 bg-blue-300 text-white dark:text-gray-800 font-bold text-center rounded-lg px-3 py-1">
                    Episode
                </h2>
                <div className="flex flex-wrap gap-4 grid grid-cols-3">
                    {animeData.episodeList.length > 0 ? animeData.episodeList.map((episode, index) => (
                        <Link
                            key={index}
                            to={`/anime/${animeCode}/${animeId}/${index + 1}`}
                            className="bg-blue-100 p-1 font-bold rounded-lg hover:text-white hover:bg-blue-400 transition-colors shadow-md"
                        >
                            {episode.title}
                        </Link>
                    )) : <p>No episodes available</p>}
                </div>
            </div>
        </div>
    );
};

export default Video;

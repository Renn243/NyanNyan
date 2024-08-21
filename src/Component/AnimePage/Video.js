import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';

const Video = () => {
    const { animeCode, animeId, episodeNumber } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        axios.get(`/anime/${animeCode}/${animeId}/${episodeNumber}`)
            .then(res => {
                setEpisode(res.data);
                setVideoList(res.data.videoList);
                setSelectedVideo(res.data.videoList[0]);
            })
            .catch(err => console.error('Error fetching episode details:', err));
    }, [animeId, episodeNumber]);

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
        <div className="py-20 lg:px-60 px-10">
            <h1 className="text-l lg:text-xl mb-8 font-black text-gray-600">{episode.title}</h1>
            <video className="w-full h-auto rounded-lg" controls key={selectedVideo ? selectedVideo.url : ''}>
                <source src={selectedVideo ? selectedVideo.url : ''} type={selectedVideo ? selectedVideo.type : ''} />
            </video>
            <div className="mt-4">
                <select
                    className="px-4 py-2 mr-2 bg-blue-300 dark:bg-gray-100 rounded-lg"
                    onChange={handleVideoChange}
                    value={selectedVideo ? selectedVideo.url : ''}
                >
                    {videoList.map((video, index) => (
                        <option key={index} value={video.url}>
                            {video.size}
                        </option>
                    ))}
                </select>

                {episode.prev_episode_number && (
                    <button
                        className="px-4 py-2 mr-2 bg-blue-300 dark:bg-gray-100 hover:bg-blue-100 rounded-lg"
                        onClick={() => handleNavigateEpisode(episode.prev_episode_number)}
                    >
                        Prev Episode
                    </button>
                )}

                {episode.next_episode_number && (
                    <button
                        className="px-4 py-2 bg-blue-300 dark:bg-gray-100 hover:bg-blue-100 rounded-lg"
                        onClick={() => handleNavigateEpisode(episode.next_episode_number)}
                    >
                        Next Episode
                    </button>
                )}
            </div>
        </div>
    );
};

export default Video;

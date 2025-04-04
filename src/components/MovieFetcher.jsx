import { useEffect, useState } from "react";
import { useVideoDetails } from "../hooks/useVideoDetails";

const MovieFetcher = ({ onMovieFetched }) => {
  const { videoInfo, fetchVideos } = useVideoDetails();
  const [randomMovie, setRandomMovie] = useState(null);
  const [randomVideo, setRandomVideo] = useState(null);

  useEffect(() => {
    async function getRandomMovie() {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=a6b118d208ff861f960ca298f3e5a5ef"
        );
        const data = await res.json();
        if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomMovie(data.results[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching random movie:", error);
      }
    }

    getRandomMovie();
  }, []);

  useEffect(() => {
    if (randomMovie) {
      fetchVideos(randomMovie.media_type || "movie", randomMovie.id);
    }
  }, [randomMovie]);

  useEffect(() => {
    if (videoInfo.length > 0) {
      const trailers = videoInfo.filter((video) => video.type === "Trailer");
      const selectedVideo =
        trailers.length > 0
          ? trailers[Math.floor(Math.random() * trailers.length)]
          : videoInfo[0];
      setRandomVideo(selectedVideo);
      onMovieFetched(selectedVideo?.key);
    }
  }, [videoInfo, onMovieFetched]);

  return <></>;
};

export default MovieFetcher;

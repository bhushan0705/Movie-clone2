import { useState } from "react";
import VideoPlay from "./VideoPlay";

const MovieDetails = ({ movie, onClose }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState(null);

  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");

  function handlePlayVideo() {
    if (!movie?.id || !mediaType) {
      console.warn("Invalid movie data for playing video:", movie, mediaType);
      return;
    }
    setPlayVideoId({ id: movie.id, mediaType });
    setPlayVideo(true);
  }

  if (!movie) return console.log("movie not found!") || null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 text-white overflow-y-scroll">
      <div className="bg-slate-800 p-6 rounded-lg max-w-2xl w-full relative md:max-w-3xl md:flex md:gap-8">
        
        {/* Image Section */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-[400px] object-cover rounded-lg mt-4 transition-transform duration-500 hover:scale-101 md:w-1/3"
        />

        {/* Content Section */}
        <div className="mt-4 md:mt-0 md:w-2/3 flex flex-col justify-between">
          <h2 className="text-4xl font-bold">{movie.title || movie.name}</h2>

          <p className="mt-4 text-sm line-clamp-5">
            <strong>Overview :</strong>
            <br />
            {movie.overview}
          </p>

          <div className="mt-4">
            <p>
              <strong>Release Date:</strong> {movie.release_date || "N/A"}
            </p>
            <p>
              <strong>Rating: </strong>
              {movie.vote_average
                ? `${(Math.round((movie.vote_average / 2) * 10) / 10).toFixed(
                    1
                  )} ⭐`
                : "N/A"}
            </p>
            <p>
              <strong>RunTime: </strong>
              {(movie.runtime / 60).toFixed(1)} hr
            </p>
          </div>

          {/* Close Button & Play Button in One Row on md */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePlayVideo}
              className="border-none px-8 py-3 cursor-pointer bg-red-600 text-black font-bold rounded-sm transition-transform duration-300 hover:scale-105 flex items-center gap-2"
            >
              <i className="fa fa-play" aria-hidden="true"></i> Play
            </button>

            {/* Close Button Positioned near Play Button in md */}
            <button
              onClick={onClose}
              className="lg:top-2 lg:right-4 text-xl font-bold text-red-600 cursor-pointer md:static md:text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      </div>

      {playVideo && (
        <VideoPlay videoId={playVideoId} close={() => setPlayVideo(false)} />
      )}
    </div>
  );
};

export default MovieDetails;

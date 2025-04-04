import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { setMovieId } from "../redux/slices/movieSlice";
import MovieDetails from "./MovieDetails";

const SearchData = ({ searchQuery }) => {
  const bannerData = useSelector((state) => state.movieData.bannerData) || [];
  const nowPlaying = useSelector((state) => state.movieData.nowPlaying) || [];
  const topRated = useSelector((state) => state.movieData.topRated) || [];
  const upcoming = useSelector((state) => state.movieData.upcoming) || [];
  const popularTv = useSelector((state) => state.movieData.popularTv) || [];
  const imageUrl = useSelector((state) => state.movieData.imageUrl) || "";

  const combinedMovieData = [
    ...bannerData,
    ...nowPlaying,
    ...topRated,
    ...upcoming,
    ...popularTv,
  ];

  const dispatch = useDispatch();
  const { movieDetails, fetchMovieDetails, loading, error } = useMovieDetails();
  const [showDetails, setShowDetails] = useState(null);

  async function handleId(mediaType, id) {
    dispatch(setMovieId({ media_type: mediaType || "movie", id: id }));
    await fetchMovieDetails(mediaType, id);
    setShowDetails(true);
  }

  function closeMovieDetails() {
    setShowDetails(false);
  }

  const seen = new Set();
  const filteredMovies = combinedMovieData.filter((movie) => {
    const movieTitle = movie?.name || movie?.title || "";
    const movieId = movie?.id;

    if (seen.has(movieId)) {
      return false;
    }
    seen.add(movieId);
    return movieTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto md:overflow-x-auto border-2 border-amber-100 p-5 relative top-30 mb-50 bg-gradient-to-b from-black to-black/75 ">
        <h1 className="text-xl font-bold text-red-500 mb-6 capitalize sticky top-0 left-0">
          {searchQuery}
        </h1>
        {filteredMovies.length === 0 ? (
          <p className="text-white">
            No movies found matching "{searchQuery}".
          </p>
        ) : (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 bg-transparent scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-gray-800">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-full md:w-64 flex-shrink-0 bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 p-2 cursor-pointer"
              >
                {movie.poster_path ? (
                  <img
                    src={imageUrl + movie.poster_path}
                    alt={movie.name || movie.title}
                    className="w-full h-96 object-cover "
                    onClick={() => handleId(movie.media_type, movie.id)}
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl text-white font-semibold">
                    {movie.name || movie.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {movie.release_date
                      ? new Date(movie.release_date).toLocaleDateString()
                      : "Release date not available"}
                  </p>
                  <div className="flex gap-2">
                    <p>
                      {(
                        Math.round((movie.vote_average / 10) * 10) / 10
                      ).toFixed(1)}{" "}
                      ⭐
                    </p>
                    <p className="capitalize">{movie.original_language}</p>
                  </div>
                  <p className="capitalize">{movie.media_type || "movies"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showDetails && !loading && !error && (
        <MovieDetails movie={movieDetails} onClose={closeMovieDetails} />
      )}
    </div>
  );
};

export default SearchData;

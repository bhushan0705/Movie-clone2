import { useDispatch } from "react-redux";
import { setMovieId } from "../redux/slices/movieSlice";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieDetails from "./MovieDetails";
import { useState } from "react";

const ScrollCards = ({ data = [], heading, media_type, imageUrl = "" }) => {
  const dispatch = useDispatch();
  const { movieDetails, fetchMovieDetails, loading, error } = useMovieDetails();
  const [showDetails, setShowDetails] = useState(false);

  async function handleId(mediaType, id) {
    dispatch(setMovieId({ media_type: mediaType || "movie", id: id }));
    await fetchMovieDetails(mediaType, id);
    setShowDetails(true);
  }

  function closeMovieDetails() {
    setShowDetails(false);
  }

  return (
    <>
      <div className="px-5 relative bottom-81 mb-10 bg-black">
        <p className="font-bold text-2xl mb-5 mt-10 pt-4">{heading}</p>

        {/* Scrollable Cards Section */}
        <div className="flex w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth px-4 space-x-4 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-300">
          {data.map((element, index) => (
            <div
              key={element.id}
              className={`flex-shrink-0 w-[300px] h-[410px] snap-start flex items-center justify-center ${
                index === data.length - 1 ? "pr-0" : "pr-4"
              }`}
            >
              <img
                src={imageUrl + element.poster_path}
                alt={element.title || element.name}
                className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer mb-10"
                onClick={() =>
                  handleId(
                    element.media_type || media_type || "movie",
                    element.id
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {showDetails && !loading && !error && (
        <MovieDetails movie={movieDetails} onClose={closeMovieDetails} />
      )}
    </>
  );
};

export default ScrollCards;

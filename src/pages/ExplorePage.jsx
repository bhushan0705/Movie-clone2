import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setExploreData, setImageUrl } from "../redux/slices/exploreSlice";
import Shimmer from "../components/Shimmer";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { setMovieId } from "../redux/slices/movieSlice";
import MovieDetails from "../components/MovieDetails";
import VideoPlay from "../components/VideoPlay";

const ExplorePage = ({ media_type }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const { movieDetails, fetchMovieDetails, loading, error } = useMovieDetails();
  const [showDetails, setShowDetails] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const exploreData = useSelector((state) => state.explore.exploreData);
  const imageUrl2 = useSelector((state) => state.explore.imageUrl2);

  const API_KEY = "a6b118d208ff861f960ca298f3e5a5ef";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch explore data from multiple pages
  async function fetchData() {
    if (!params.explore) return;

    setIsFetching(true);
    try {
      const response1 = await fetch(
        `${BASE_URL}/discover/${params.explore}?api_key=${API_KEY}&page=1`
      );
      const data1 = await response1.json();

      const response2 = await fetch(
        `${BASE_URL}/discover/${params.explore}?api_key=${API_KEY}&page=2`
      );
      const data2 = await response2.json();

      const combinedResults = [
        ...(data1.results || []),
        ...(data2.results || []),
      ];

      dispatch(setExploreData(combinedResults));
      dispatch(setImageUrl("https://image.tmdb.org/t/p/w500"));
    } catch (error) {
      console.error("❌ API Error:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [params.explore]);

  // useEffect(() => {
  //   console.log("Updated exploreData:", exploreData);
  // }, [exploreData]);

  async function handleId(mediaType, id) {
    const selectedType = mediaType || params.explore || "movie";

    // console.log("Selected Media Type:", selectedType, "ID:", id);

    try {
      dispatch(setMovieId({ media_type: selectedType, id: id }));
      await fetchMovieDetails(selectedType, id);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  function closeMovieDetails() {
    setShowDetails(false);
  }

  return isFetching ? (
    <Shimmer />
  ) : (
    <div className="bg-black min-h-screen p-10">
      <h1 className="text-white text-3xl font-bold mb-6 mt-5">
        Explore {params.explore}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {exploreData.length > 0 ? (
          exploreData.map((item, id) => (
            <div
              key={id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={
                  item.poster_path
                    ? `${imageUrl2}${item.poster_path}`
                    : "/placeholder.jpg"
                }
                alt={item.title || item.name}
                className="w-full h-[300px] object-cover transform transition duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() =>
                  handleId(
                    item.media_type || media_type || params.explore,
                    item.id
                  )
                }
              />
            </div>
          ))
        ) : (
          <p className="text-white text-lg">No results found.</p>
        )}
      </div>

      {showDetails && !loading && !error && (
        <MovieDetails movie={movieDetails} onClose={closeMovieDetails} />
      )}
    </div>
  );
};

export default ExplorePage;

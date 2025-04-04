import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setBannerdata,
  setImageUrl,
  setNowPlaying,
  setTopRated,
  setTv,
  setUpcoming,
} from "../redux/slices/movieSlice";

const API_KEY = "a6b118d208ff861f960ca298f3e5a5ef";
const BASE_URL = "https://api.themoviedb.org/3";

const useFetchMovies = () => {
  const dispatch = useDispatch();

  const fetchData = async (endpoint, action) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      const data = await response.json();
      dispatch(
        action(data.results || data.images?.secure_base_url + "original")
      );
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData("trending/all/week", setBannerdata);
    fetchData("configuration", setImageUrl);
    fetchData("movie/now_playing", setNowPlaying);
    fetchData("movie/top_rated", setTopRated);
    fetchData("movie/upcoming", setUpcoming);
    fetchData("trending/tv/day", setTv);
  }, []); // Runs only once when the component mounts
};

export default useFetchMovies;

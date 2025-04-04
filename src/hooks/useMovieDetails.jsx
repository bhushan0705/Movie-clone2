import { useState } from "react";

const API_KEY = "a6b118d208ff861f960ca298f3e5a5ef";
const BASE_URL = "https://api.themoviedb.org/3";

export function useMovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieDetails(mediaType, id) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      setError("Failed to fetch movie details");
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  }

  return { movieDetails, fetchMovieDetails, loading, error };
}

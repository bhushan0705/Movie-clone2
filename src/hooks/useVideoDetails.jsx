import { useState } from "react";

const API_KEY = "a6b118d208ff861f960ca298f3e5a5ef";
const BASE_URL = "https://api.themoviedb.org/3";

export function useVideoDetails() {
  const [videoInfo, setVideoInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchVideos(mediaType, id) {
    if (!mediaType || !id) {
      console.warn("fetchVideos called with invalid parameters:", {
        mediaType,
        id,
      });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );

      const data = await response.json();
      
      setVideoInfo(data.results || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Sorry video not found!!");
    } finally {
      setLoading(false);
    }
  }

  return { videoInfo, loading, error, fetchVideos };
}

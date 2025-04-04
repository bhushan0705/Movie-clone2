import React, { useEffect, useState } from "react";
import { useVideoDetails } from "../hooks/useVideoDetails";

const VideoPlay = ({ videoId, close }) => {
  const { videoInfo, loading, error, fetchVideos } = useVideoDetails();
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (videoId?.mediaType && videoId?.id) {
      fetchVideos(videoId.mediaType, videoId.id);
    }
  }, [videoId]);

  useEffect(() => {
    if (videoInfo.length > 0) {
      const trailers = videoInfo.filter((video) => video.type === "Trailer"); // Get only trailers
      setTrailer(trailers.length > 0 ? trailers[0] : videoInfo[0]); // Pick trailer if available
    }
  }, [videoInfo]);

  return (
    <section className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-center items-center">
      <div
        className="bg-black w-full h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative 
                md:w-[90%] md:h-[60vh] md:max-w-screen-md"
      >
        <button
          onClick={close}
          className="absolute top-3 right-5 bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
        >
          X
        </button>

        {loading ? (
          <p className="text-white text-center">Loading...Please Wait...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : trailer ? (
          <iframe
            className="w-full h-full md:w-[90%] md:h-[90%]"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1&rel=0`}
            title={trailer.name || "Trailer"}
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-white text-center mt-10">
            Sorry... No trailer available!
          </p>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;

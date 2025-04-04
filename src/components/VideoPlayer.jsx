import { useEffect, useRef, useState } from "react";
import bgImg from "../assets/bgImg.jpg";

const VideoPlayer = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    };

    const createPlayer = () => {
      if (videoId && window.YT) {
        playerRef.current = new window.YT.Player("videoPlayer", {
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
            disablekb: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
              event.target.mute();
            },
          },
        });
      }
    };

    if (videoId) {
      if (window.YT) {
        createPlayer();
      } else {
        loadYouTubeAPI();
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const togglePlayPause = () => {
    if (playerRef.current) {
      isPlaying
        ? playerRef.current.pauseVideo()
        : playerRef.current.playVideo();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      isMuted ? playerRef.current.unMute() : playerRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative bottom-30 w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[130vh] object-fill overflow-hidden">
      {videoId ? (
        <div className="absolute w-full h-full">
          <div id="videoPlayer" className="w-full h-full"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>
      ) : (
        <img src={bgImg} alt="background Image" />
      )}
      <div className="absolute inset-0 flex items-center justify-center gap-4 md:left-3 lg:top-60 lg:right-215 ">
        <button
          className="border-none px-8 py-3 mt-10 cursor-pointer bg-red-600 text-black font-bold rounded-sm transition-transform duration-300 hover:scale-105 flex items-center gap-2"
          onClick={togglePlayPause}
        >
          <i
            className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}
            aria-hidden="true"
          ></i>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={toggleMute}
          className="border-none px-8 py-3 mt-10 cursor-pointer bg-red-600 text-black font-bold rounded-sm transition-transform duration-300 hover:scale-105 flex items-center gap-2"
        >
          <i
            className={`fa ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}
            aria-hidden="true"
          ></i>
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

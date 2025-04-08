import { useState } from "react";
import { useSelector } from "react-redux";
import MovieFetcher from "../components/MovieFetcher";
import VideoPlayer from "../components/VideoPlayer";
import Cards from "../components/Cards";
import SignUpPage from "./SignUpPage";
import useFetchMovies from "../hooks/useFetchMovie";


const Home = () => {
  const [videoId, setVideoId] = useState(null);
  const isLogged = useSelector((state) => state.auth.isAuthenticated);

  useFetchMovies();

  return (
    <>      
      {isLogged ? (
        <div className="h-[100vh]">
          <MovieFetcher onMovieFetched={setVideoId} />
          <VideoPlayer videoId={videoId} />
          <Cards />
        </div>
      ) : (
        <div>
          <SignUpPage />
        </div>
      )}
    </>
  );
};

export default Home;

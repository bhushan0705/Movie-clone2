// import Fetching from "../constant.jsx/Fetching";
// import { useState } from "react";
// import MovieFetcher from "../components/MovieFetcher";
// import VideoPlayer from "../components/VideoPlayer";
// import Cards from "../components/Cards";
// import SignUpPage from "./SignUpPage";
// import { useSelector } from "react-redux";

// const Home = () => {
//   const [videoId, setVideoId] = useState(null);
//   const isLogged = useSelector((state) => state.auth.isAuthenticated);



//   return (
//     <>
//       <Fetching />
//       {isLogged ?
//       <div className=" h-[100vh]">
//         <MovieFetcher onMovieFetched={setVideoId} />
//         <VideoPlayer videoId={videoId} />
//         <Cards></Cards>
//       </div> :
//       <SignUpPage></SignUpPage>
//       }
//     </>
//   );
// };

// export default Home;






import { useState } from "react";
import { useSelector } from "react-redux";
import Fetching from "../constant.jsx/Fetching";
import MovieFetcher from "../components/MovieFetcher";
import VideoPlayer from "../components/VideoPlayer";
import Cards from "../components/Cards";
import SignUpPage from "./SignUpPage";
import bgImg from '../assets/bgImg.jpg'

const Home = () => {
  const [videoId, setVideoId] = useState(null);
  const isLogged = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Fetching />
      {isLogged ? (
        <div className="h-[100vh]">
          <MovieFetcher onMovieFetched={setVideoId} />
          <VideoPlayer videoId={videoId} />
          <Cards />
        </div>
      ) : (
        <div>

          <SignUpPage />
          <img src={bgImg} alt="" />
        </div>
      )}
    </>
  );
};

export default Home;

import React from "react";
import { useSelector } from "react-redux";
import ScrollCards from "./ScrollCards";

const Cards = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const nowPlaying = useSelector((state)=>state.movieData.nowPlaying);
  const topRated = useSelector((state)=>state.movieData.topRated);
  const upcoming = useSelector((state)=>state.movieData.upcoming);
  const popularTv= useSelector((state)=>state.movieData.popularTv);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);

  return (
    <>
      <ScrollCards data={bannerData} heading={"Trending"} imageUrl={imageUrl} ></ScrollCards>
      <ScrollCards data={nowPlaying} heading={"Now Playing"} imageUrl={imageUrl} media_type={"movie"} ></ScrollCards>
      <ScrollCards data={upcoming} heading={"Upcoming"} imageUrl={imageUrl}></ScrollCards>
      <ScrollCards data={topRated} heading={"Top Rated"} imageUrl={imageUrl}></ScrollCards>
      <ScrollCards data={popularTv} heading={"Tv Shows"} imageUrl={imageUrl}></ScrollCards>
    </>
  );
};

export default Cards;

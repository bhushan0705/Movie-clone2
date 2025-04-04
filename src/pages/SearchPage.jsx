import React, { useEffect, useRef, useState } from "react";
import backImg from "../assets/bgImg.jpg";
import SearchData from "../components/SearchData";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [hasSearched]);

  const handleQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (text) => {
    setSearchQuery(text);
    setHasSearched(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchQuery === "" || !searchQuery.trim()) {
        alert("Enter valid movie name or series name..");
      } else {
        setHasSearched(true);
      }
    }
  };

  const handleSearch = () => {
    if (searchQuery === "" || !searchQuery.trim()) {
      alert("Enter a valid movie or series name.");
    } else {
      setHasSearched(true);
    }
  };

  const inputFocus = useRef();

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute w-full h-full">
        <img
          src={backImg}
          alt="Background"
          className="object-cover w-full h-full brightness-50 mix-blend-multiply fixed"
        />
        <div className="absolute inset-0 bg-transparent bg-opacity-70"></div>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative w-full h-full overflow-y-auto">
        {/* Search Bar */}
        <div className="w-full flex justify-center items-center relative">
          <input
            type="text"
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={handleQuery}
            ref={inputFocus}
            placeholder="Want To Search Your Movies? Start From Here...."
            className="border-2 border-red-500 w-[50%] h-12 md:h-16 px-4 py-2 rounded-2xl bg-black text-white relative top-25"
          />
          <p>
            <i
              className="fa fa-search text-2xl text-gray-600 cursor-pointer relative top-25 right-10  bg-black"
              aria-hidden="true"
              onClick={handleSearch}
            ></i>
          </p>
        </div>

        {!hasSearched ? (
          <div className="flex flex-col items-center justify-start p-10">
            <h1 className="text-6xl font-bold text-white mt-20 tracking-[1px]">
              Welcome to Netflix
            </h1>
            <p className="text-sm text-white">
              Discover movie recommendations based on your interests!
            </p>

            <div className="flex flex-col items-center gap-3 mt-4 text-white flex-wrap">
              <p>Try searching for:</p>
              <div className="flex flex-wrap gap-4 text-sm justify-center">
                <button
                  className="bg-red-700 px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-500"
                  onClick={() => handleClick("Snow White")}
                >
                  Comedy Movies like 'Snow White'
                </button>
                <button
                  className="bg-red-700 px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-500"
                  onClick={() => handleClick("Bollywood Romantic Movies")}
                >
                  Bollywood Romantic Movies
                </button>
                <button
                  className="bg-red-700 px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-500"
                  onClick={() => handleClick("Thriller Movies from Hollywood")}
                >
                  Thriller Movies from Hollywood
                </button>
                <button
                  className="bg-red-700 px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-500"
                  onClick={() => handleClick("Sci-fi Movies like 'Inception'")}
                >
                  Sci-fi Movies like 'Inception'
                </button>
                <button
                  className="bg-red-700 px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-500"
                  onClick={() => handleClick("Movies by Christopher Nolan")}
                >
                  Movies by Christopher Nolan
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-5 text-white opacity-60">
              <p>Type in the search bar to get recommendations</p>
              <p>
                Specify genres, countries, or themes like 'Korean Dramas' or
                'Action Movies from the 90s.'
              </p>
            </div>
          </div>
        ) : (
          <div className="p-10">
            <SearchData searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

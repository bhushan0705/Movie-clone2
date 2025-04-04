import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import smile from "../assets/smile.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isLogged = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);


  const dispatch = useDispatch()

  // Safe fallback in case user is undefined
  const userFirstName = user?.email?.slice(0, 1).toUpperCase() || "";

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInput.trim() === "") {
      navigate("/search");
    } else {
      navigate(`/search?SearchName=${searchInput}`);
    }
  }

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?SearchName=${searchInput}`);
    }
  }, [searchInput]);

  function handleFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
      navigate("/search");
    }
  }

  function handleProfile() {
    console.log("Logged In:", isLogged);
    dispatch(logout())
    setShowDropdown(false);
    // Add dropdown logic here if needed
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };


  return (
    <>
      {isLogged && (
        <div className="flex items-center gap-4">
          {location.pathname === "/search" ? (
            <Link to="/">
              <button className="border-2 border-red-500 px-4 py-2 rounded-2xl cursor-pointer">
                Home <i className="fa-solid fa-house"></i>
              </button>
            </Link>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Movie"
                className="border border-gray-400 bg-white text-red-600 italic h-10 w-30 lg:w-56 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                ref={inputRef}
                onClick={handleFocus}
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
              </button>
            </form>
          )}

          <img src={smile} alt="smile" className="h-6 hidden lg:block" />

          <p
            className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded-full cursor-pointer text-white font-bold"
            onClick={toggleDropdown}
          >
            {userFirstName}
          </p>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-15 right-2 bg-white text-black rounded-md shadow-md w-28 z-50">
              <button
                onClick={handleProfile}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;

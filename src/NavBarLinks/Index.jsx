import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const Index = () => {


  const isLogged = useSelector((state) => state.auth.isAuthenticated);


  return (
    <nav className="flex justify-between items-center px-4 lg:px-8 py-4 fixed w-full z-50">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 lg:h-12" />
        </Link>

        {/* Navigation Links */}
        {isLogged &&      
        <div className="flex gap-2 lg:gap-8 text-white font-medium">
          <Link to="/" className="hidden lg:block">
            Home
          </Link>

          <Link to="/explore/tv" className="block">
            Tv Shows
          </Link>
          <Link to="/explore/movie" className="block mr-4">
            Movies
          </Link>
          <Link to="/explore/newPopular" className="hidden lg:block">
            New & Popular
          </Link>
          <Link to="#" className="hidden lg:block">
            My List
          </Link>
        </div> 
      }

      </div>

      <SearchBar />
    </nav>
  );
};

export default Index;

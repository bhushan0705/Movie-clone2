import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./routes";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import DetailsPage from "./pages/DetailsPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      <div>
        <Index></Index>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:explore" element={<ExplorePage />} />
          <Route path="/explore/:explore/:id" element={<DetailsPage />} />


          <Route path="/search" element={<SearchPage />} />
          <Route path="/tv" element={<ExplorePage />} />
          <Route path="/movie" element={<ExplorePage />} />
          <Route path="/explore/newPopular" element={<ExplorePage />} />
          <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/signIn" element={<SignInPage></SignInPage>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

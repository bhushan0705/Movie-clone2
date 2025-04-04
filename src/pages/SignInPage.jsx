import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import bgImg from '../assets/bgImg.jpg';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginForm = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      dispatch(login(savedUser));
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <img src={bgImg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <form onSubmit={handleLoginForm} className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-black/50 border-2 border-red-500 rounded-2xl w-full max-w-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h1>
          
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
            className="w-full p-3 mb-4 rounded-xl bg-black/50 text-white border-2 border-red-500 placeholder-gray-400"
            required
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Your Password"
            className="w-full p-3 mb-4 rounded-xl bg-black/50 text-white border-2 border-red-500 placeholder-gray-400"
            required
          />

          <button className="w-full bg-red-600 p-3 rounded-lg font-bold text-white hover:bg-red-700 transition-all cursor-pointer">
            Login
          </button>

          <p className="text-white mt-4 text-center text-sm">
            Don't Have an Account Yet?{" "}
            <Link to="/signUp" className="text-amber-500 underline hover:text-amber-400 cursor-pointer">
              Sign Up
            </Link>{" "}
            here.
          </p>
        </div>
      </form>
    </>
  );
};

export default SignInPage;

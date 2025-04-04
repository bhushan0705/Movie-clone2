import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../assets/bgImg.jpg';

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    const userInfo = {
      name: fullName,
      userName: userName,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(userInfo));
    alert("Account created successfully!");
    navigate("/signIn");
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white relative px-4">
      <img
        src={bgImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/80 z-10"></div>

      <form onSubmit={handleSignUp} className="w-full max-w-md z-20">
        <div className="p-6 sm:p-8 flex flex-col gap-4 bg-black/80 rounded-xl w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 text-center">
            Sign Up
          </h1>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 px-4 rounded-xl bg-gray-700 text-white w-full"
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="h-12 px-4 rounded-xl bg-gray-700 text-white w-full"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 px-4 rounded-xl bg-gray-700 text-white w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 px-4 rounded-xl bg-gray-700 text-white w-full"
            required
          />

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 mt-2 rounded-xl transition-all cursor-pointer">
            Sign Up
          </button>

          <p className="text-sm mt-3 text-center">
            Already Registered?{" "}
            <Link to="/signIn" className="text-red-400 hover:underline cursor-pointer">
              Sign In.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;

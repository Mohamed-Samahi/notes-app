import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";

import { UserAuth } from "../context/UserContext";
const Home = () => {
  const { user } = UserAuth();
  console.log("test from home");

  return (
    <div className="sm:flex sm:flex-col sm:items-center pl-6 absolute top-[40%] translate-y-[-50%] left-[50%] translate-x-[-50%] mx-auto max-w-7xl w-full">
      <h1 className="mb-2 font-serif text-2xl font-bold text-center text-yellow-300 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Write, Plan, Organize with <br />our notes app.
      </h1>
      <p className="sm:text-xl lg:text-2xl text-center font-semibold font-serif mb-10 max-w-[650px] w-[100%] text-white mt-4">
        Capture your thoughts, organize your day, and stay productive.
      </p>
      <div className="flex self-center mt-10">
        {user?.email ? (
          <Link to="/notes">
            <Button>My Notes</Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;

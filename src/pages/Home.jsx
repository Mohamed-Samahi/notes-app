import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";

import { UserAuth } from "../context/UserContext";
const Home = () => {
  const { user } = UserAuth();
  console.log("test from home");

  return (
    <div className="sm:flex sm:flex-col sm:items-center pl-6 absolute top-[40%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-screen">
      <h1 className="font-bold font-serif text-2xl sm:text-5xl text-white mb-2">
        Tame your work,
      </h1>
      <p className="sm:text-xl font-serif mb-10 max-w-[650px] w-[100%]">
        organize your life Remember everything and tackle any project with your
        notes, tasks, and schedule all in one place.
      </p>
      <div className="w-32 flex self-center">
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

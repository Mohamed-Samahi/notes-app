import React from "react";

import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";

import { UserAuth } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 pt-4 mx-auto max-w-7xl">
      <Link to="/">
        <h2 className="font-bold text-black sm:text-xl">Note</h2>
      </Link>
      {user?.email ? (
        <div className="max-w-[8rem] w-[100%]">
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      ) : (
        <div className="w-[14rem] flex justify-between items-center">
          <div className="w-[50%]">
            <Link to="/login">
              <Button backgroundColor={"bg-white"}>Login</Button>
            </Link>
          </div>
          <div className="w-[50%] ml-2">
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

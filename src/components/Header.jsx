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
    <div className="flex items-center justify-between w-full py-4 mx-auto max-w-7xl">
      <Link to="/">
        <img src="/assets/logo.webp" alt="logo" width={56} height={56} />
      </Link>
      {user?.email ? (
        <div className="max-w-[8rem] w-[100%]">
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full max-w-fit">
          <div className="flex-1">
            <Link to="/login">
              <Button backgroundColor={"bg-white"}>Login</Button>
            </Link>
          </div>
          <div className="flex-1">
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

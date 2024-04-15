import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";

import { UserAuth } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsValid, setpasswordIsValid] = useState(true);

  const [error, setError] = useState("");

  const { signUp } = UserAuth();

  const emailChangeHandler = (e) => {
    setEamil(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password.trim().length < 6) {
      setpasswordIsValid(false);
    } else {
      setpasswordIsValid(true);
    }

    try {
      await Promise.all([signUp(email, password)]).then(() => {
        navigate("/");
      });
    } catch (e) {
      setError(e.message);
    }

    setEamil("");
    setPassword("");
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mx-auto max-w-7xl">
      <Card>
        <form onSubmit={submitHandler} action="" className="flex flex-col">
          <h1 className="text-3xl font-bold text-black text-center mb-[40px]">
            Sign Up
          </h1>
          {error ? (
            <h2 className="p-4 my-4 font-bold text-black bg-red-500 rounded">
              {error}
            </h2>
          ) : null}
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="email address"
            autoComplete="off"
            className="p-4 rounded-xl shadow-md shadow-yellow-3000 mb-4 border border-yellow-3000 focus:outline-none focus:border-slate-500 w-[100%] max-w-[400px]"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            placeholder="password"
            className="p-4 rounded-xl shadow-md shadow-yellow-3000 mb-4 border border-yellow-3000 focus:outline-none focus:border-slate-500 w-[100%] max-w-[400px]"
          />
          {!passwordIsValid && (
            <p className="mb-4 font-bold text-red-600">
              Invalid Password! at least 6 characters
            </p>
          )}
          <Button>Sign up</Button>
          <p className="my-4 text-xs text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-xs font-bold text-yellow-300">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;

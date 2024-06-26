import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";

import { UserAuth } from "../context/UserContext";

const Login = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login } = UserAuth();

  const navigate = useNavigate();

  if (user?.email) navigate('/')

  const emailChangeHandler = (e) => {
    setEamil(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/");
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
            Login
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
            autoComplete="on"
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
          <Button>Login</Button>
          <p className="my-4 text-xs text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-xs font-bold text-yellow-300">
              Signup
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;

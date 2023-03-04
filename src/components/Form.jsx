import React from "react";

import { useState } from "react";

import Button from "./Button";
import Card from "./Card";

const Form = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setpasswordIsValid] = useState(true);

  const emailChangeHandler = (e) => {
    setEamil(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (email.trim() === "" || !email.includes("@")) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }

    if (password.trim().length < 6) {
      setpasswordIsValid(false);
    } else {
      setpasswordIsValid(true);
    }

    if (emailIsValid && passwordIsValid) {
      console.log("good job");
      setEamil("");
      setPassword("");
    } else {
      return;
    }
  };
  return (
    <Card>
      <form onSubmit={submitHandler} action="" className="flex flex-col">
        <h1 className="text-3xl font-bold text-black text-center mb-[40px]">
          Login
        </h1>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          placeholder="email address"
          autoComplete="off"
          className="p-4 rounded-xl shadow-md shadow-slate-300 mb-4 border border-slate-300 focus:outline-none focus:border-slate-500 w-[100%] max-w-[400px]"
        />
        {!emailIsValid && (
          <p className="text-red-600 font-bold mb-4">Invalid Email!</p>
        )}
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={passwordChangeHandler}
          placeholder="password"
          className="p-4 rounded-xl shadow-md shadow-slate-300 mb-4 border border-slate-300 focus:outline-none focus:border-slate-500 w-[100%] max-w-[400px]"
        />
        {!passwordIsValid && (
          <p className="text-red-600 font-bold mb-4">Invalid Password!</p>
        )}
        <Button>Login</Button>
      </form>
    </Card>
  );
};

export default Form;

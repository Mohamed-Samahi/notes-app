import React from "react";

const Button = ({ children, onClick, backgroundColor }) => {
  return (
    <button
      className={`p-2 sm:p-4 w-full ${
        backgroundColor ? backgroundColor : "bg-yellow-300"
      } rounded-lg text-black font-bold border border-yellow-300`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

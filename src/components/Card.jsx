import React from "react";

const Card = ({ children, width }) => {
  return (
    <div
      className={`${
        width ? width : ""
      }h-auto m-auto w-[325px] sm:w-[400px] rounded-lg p-8 bg-white`}
    >
      {children}
    </div>
  );
};

export default Card;

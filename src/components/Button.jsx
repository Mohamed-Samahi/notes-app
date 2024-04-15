import React from "react";

const Button = ({ children, onClick, backgroundColor, className }) => {
  return (
    <button
      className={className ? `${className} ${backgroundColor ? backgroundColor : "bg-yellow-300 hover:bg-transparent"
        } rounded-lg text-white hover:text-yellow-300 transition-all font-bold border-2 border-yellow-300` : `p-2 sm:px-4 sm:py-2 w-full ${backgroundColor ? backgroundColor : "bg-yellow-300 hover:bg-transparent"
        } rounded-lg text-white hover:text-yellow-300 transition-all font-bold border-2 border-yellow-300 text-lg md:text-xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

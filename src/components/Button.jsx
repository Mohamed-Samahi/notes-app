import React from "react";

const Button = ({ children, onClick, backgroundColor, className }) => {
  return (
    <button
      className={className ? `${className} ${backgroundColor ? backgroundColor : "bg-[#3fa4af] hover:bg-transparent"
        } rounded-lg text-white hover:text-[#3fa4af] transition-all font-bold border-2 border-[#3fa4af]` : `p-2 sm:px-4 sm:py-2 w-full ${backgroundColor ? backgroundColor : "bg-[#3fa4af] hover:bg-transparent"
        } rounded-lg text-white hover:text-[#3fa4af] transition-all font-bold border-2 border-[#3fa4af] text-lg md:text-xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

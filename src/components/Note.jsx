import React from "react";

const Note = ({ id, title, content }) => {
  return (
    <>
      <div className="w-[60%]">
        <div id={id} className="w-full">
          <h1 className="font-bold text-xl text-ellipsis whitespace-nowrap overflow-hidden">
            {title}
          </h1>
          <p className="text-sm text-gray-500 indent-1 w-full text-ellipsis whitespace-nowrap overflow-hidden visible">
            {content}
          </p>
        </div>
      </div>
    </>
  );
};

export default Note;

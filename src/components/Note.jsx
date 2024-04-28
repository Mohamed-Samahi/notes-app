import React from "react";

const Note = React.memo(({ id, title, content }) => {
  console.log("asfd")
  return (
    <>
      <div className="w-[60%]">
        <div id={id} className="w-full">
          <h1 className="overflow-hidden text-xl font-bold text-ellipsis whitespace-nowrap">
            {title}
          </h1>
          <p className="visible w-full overflow-hidden text-sm text-gray-500 indent-1 text-ellipsis whitespace-nowrap">
            {content}
          </p>
        </div>
      </div>
    </>
  );
});

export default Note;
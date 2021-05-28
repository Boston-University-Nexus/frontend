import React from "react";

// Display when search bar is empty
export default function StartTyping() {
  return (
    <div className="flex items-end uppercase h-full text-center p-4">
      <div className="h-2/3 xl:1/2 2xl:h-1/3 w-full flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-sm xl:text-lg">start searching...</h2>
          <p className="text-xs xl:text-sm">
            find courses, departments & instructors
          </p>
        </div>
        <div>
          <p className="text-xs">
            tip: use filters if you are looking for something specific
          </p>
        </div>
      </div>
    </div>
  );
}

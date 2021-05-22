import React from "react";

export default function StartTyping() {
  return (
    <div className="flex items-end uppercase h-full text-center p-4">
      <div className="h-1/3 w-full flex flex-col justify-between">
        <div>
          <h2 className="font-black text-xl">start searching...</h2>
          <p className="text-md">find courses, departments & instructors</p>
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

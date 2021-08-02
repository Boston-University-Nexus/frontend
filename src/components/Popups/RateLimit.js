import React from "react";
// Icons
import { IoCloseOutline } from "react-icons/io5";

export default function RateLimit(props) {
  return (
    <div className="bg-white p-5 rounded-md shadow-2xl relative">
      <div className="flex items-start justify-between">
        <h1 className="font-bold text-xl mb-2">
          Whoops! You are going too fast.
        </h1>
        <IoCloseOutline
          className="text-xl cursor-pointer"
          onClick={() => props.close("rateLimit")}
        />
      </div>
      <p className="leading-relaxed">
        You seem to be making too many requests to our server, please slow down.
      </p>
    </div>
  );
}

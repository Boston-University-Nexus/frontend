import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import "react-toastify/dist/ReactToastify.css";

// Helper function to get day initials
function getDayInits(arr) {
  let str = "";
  for (const day of arr) {
    if (day.toLowerCase() === "thursday") str += "r";
    else str += day.charAt(0);
  }

  return str.toUpperCase();
}

export default function CartItem(props) {
  const [checked, setChecked] = useState(true);
  const [screenW, setScreenW] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => setScreenW(window.innerWidth));

    setScreenW(window.innerWidth);
    setChecked(!(props.item.displayed === false));

    return () => {
      window.removeEventListener("resize", () => setScreenW(window.innerWidth));
    };
  }, [props.item.displayed]);

  return (
    <div
      className="w-full h-26 flex items-center justify-between px-2 lg:px-4 py-5 border-b border-solid border-gray-300 cursor-pointer hover:bg-blue-200 transition-colors select-none group"
      onClick={() => {
        props.updateCart(props.item.title, props.item);
        setChecked(!checked);
      }}
    >
      <div className="flex items-center w-full">
        {checked ? (
          <ImCheckboxChecked
            className="text-xl text-blue-500"
            style={{
              minWidth: Math.max(screenW / 80, 10),
              width: Math.max(screenW / 80, 10),
            }}
          />
        ) : (
          <ImCheckboxUnchecked
            className="text-xl text-blue-500"
            style={{
              minWidth: Math.max(screenW / 80, 10),
              width: Math.max(screenW / 80, 10),
            }}
          />
        )}
        <div className="flex flex-col justify-center ml-2">
          <span className="font-bold text-xs md:text-sm lg:text-base whitespace-nowrap">
            {props.item.title}
          </span>
          <div className="flex flex-col text-sm">
            <span className="text-xs lg:text-sm whitespace-nowrap">
              {props.item.start}-{props.item.end}
            </span>
            <span className="mr-1 text-xs lg:text-sm">
              {getDayInits(props.item.days)}
            </span>
          </div>
        </div>
      </div>
      <FaTrashAlt className="text-xl text-gray-400 hover:text-red-500 transition-colors transition-oapcity opacity-0 group-hover:opacity-100" />
    </div>
  );
}

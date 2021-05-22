import React from "react";

import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const colors = ["green", "yellow", "red", "blue", "indigo", "purple", "pink"];

export default function CalendarItem(props) {
  let color = colors[props.section.id];
  return (
    <div
      className={
        "absolute bg-" +
        color +
        "-100 border-l-4 border-" +
        color +
        "-500 text-" +
        color +
        "-500 p-4 w-full h-full flex items-center justify-left"
      }
    >
      <h3 className="font-bold text-lg">{props.section.title}</h3>
      <h4 className="flex items-center">
        <FaUserAlt />
        <span className="ml-2">{props.section.professor}</span>
      </h4>
      <h4 className="flex items-center">
        <IoLocationSharp />
        <span className="ml-2">{props.section.location}</span>
      </h4>
    </div>
  );
}

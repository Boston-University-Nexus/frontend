import React from "react";

import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp, IoClose } from "react-icons/io5";
import { textToDiff, textToTime } from "./CalendarMethods";

const colors = ["green", "yellow", "red", "blue", "indigo", "purple", "pink"];

export default function CalendarItem(props) {
  let color = colors[props.section.id];
  let fromTop = props.h + textToTime(props.section.start, 7) * props.h;
  let calcHeight = textToDiff(props.section.start, props.section.end) * props.h;

  console.log(props.h);

  return (
    <div
      className={
        "absolute bg-" +
        color +
        "-100 border-l-4 border-" +
        color +
        "-500 text-" +
        color +
        "-500 px-px lg:px-2 w-full flex flex-col items-left justify-center overflow-hidden calendarItem"
      }
      style={{
        top: fromTop,
        height: calcHeight,
      }}
    >
      <div className="flex justify-between items-start sectionTitle">
        <h3 className="font-bold">{props.section.title}</h3>
        <IoClose className="" />
      </div>
      <div className="flex items-center justify-start w-full sectionProps">
        <h4 className="flex items-center uppercase whitespace-nowrap left-child">
          <FaUserAlt className="" />
          <span className="lg:ml-1 overflow-ellipsis overflow-hidden">
            {props.section.professor}
          </span>
        </h4>
        <h4 className="flex items-center uppercase whitespace-nowrap right-child">
          <IoLocationSharp className="" />
          <span className="lg:ml-1 overflow-ellipsis overflow-hidden">
            {props.section.location}
          </span>
        </h4>
      </div>
    </div>
  );
}

import React from "react";

import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp, IoClose } from "react-icons/io5";

const colors = ["green", "yellow", "red", "blue", "indigo", "purple", "pink"];

function textToTime(txt) {
  let hour = parseInt(txt.substring(0, 2));
  let min = parseInt(txt.substring(3, 5));

  let time = hour * 60 + min;
  let diff = time - 7 * 60;

  return diff;
}

function textToDiff(txt1, txt2) {
  let hour1 = parseInt(txt1.substring(0, 2));
  let min1 = parseInt(txt1.substring(3, 5));
  let time1 = hour1 * 60 + min1;

  let hour2 = parseInt(txt2.substring(0, 2));
  let min2 = parseInt(txt2.substring(3, 5));
  let time2 = hour2 * 60 + min2;

  return time2 - time1;
}

export default function CalendarItem(props) {
  let color = colors[props.section.id];
  let fromTop = 32 + (textToTime(props.section.start) * 45) / 60;
  let calcHeight =
    (textToDiff(props.section.start, props.section.end) * 45) / 60;

  return (
    <div
      className={
        "absolute bg-" +
        color +
        "-100 border-l-4 border-" +
        color +
        "-500 text-" +
        color +
        "-500 px-2 w-full flex flex-col items-left justify-center"
      }
      style={{
        top: fromTop,
        height: calcHeight,
      }}
    >
      <div className="flex justify-between">
        <h3 className="font-bold text-xs">{props.section.title}</h3>
        <IoClose />
      </div>
      <h4 className="flex items-center text-2xs uppercase">
        <FaUserAlt />
        <span className="ml-2">{props.section.professor}</span>
      </h4>
      <h4 className="flex items-center text-2xs uppercase">
        <IoLocationSharp />
        <span className="ml-2">{props.section.location}</span>
      </h4>
    </div>
  );
}

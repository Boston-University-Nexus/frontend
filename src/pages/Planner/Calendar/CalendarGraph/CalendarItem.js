import React from "react";

// Icons
import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp, IoClose } from "react-icons/io5";
import { textToDiff, textToTime } from "./CalendarMethods";

// Different colors for each class
const colors = [
  "text-green-500",
  "text-yellow-500",
  "text-red-500",
  "text-blue-500",
  "text-purple-500",
  "text-pink-500",
];
const bgColors = [
  "bg-green-100",
  "bg-yellow-100",
  "bg-red-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-pink-100",
];
const borderColors = [
  "border-green-500",
  "border-yellow-500",
  "border-red-500",
  "border-blue-500",
  "border-purple-500",
  "border-pink-500",
];

export default function CalendarItem(props) {
  let color = colors[props.colorId % colors.length];
  let bgColor = bgColors[props.colorId % colors.length];
  let borderColor = borderColors[props.colorId % colors.length];

  // Days of week fields are also h, so h + diff * h
  let fromTop =
    props.h + textToTime(props.section.start, props.start) * props.h;

  // duration in hours * h px/height
  let calcHeight = textToDiff(props.section.start, props.section.end) * props.h;

  return (
    <div
      className={`absolute ${bgColor} border-l-4 ${borderColor} ${color} px-px lg:px-2 w-full flex flex-col items-left justify-center overflow-hidden calendarItem`}
      style={{
        top: fromTop,
        height: calcHeight,
      }}
    >
      <IoClose className="cursor-pointer absolute top-2 right-2" />
      <div className="flex justify-between items-start sectionTitle">
        <h3 className="font-bold">{props.section.title}</h3>
      </div>

      {/* ONLY IF SCREEN IS BIG ENOUGH */}
      {window.innerWidth > 1024 && (
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
              {props.section.building}
            </span>
          </h4>
        </div>
      )}
    </div>
  );
}

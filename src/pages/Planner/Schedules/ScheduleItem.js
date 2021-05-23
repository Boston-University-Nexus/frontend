import React from "react";

import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ScheduleRating from "./ScheduleRating";

export default function ScheduleItem(props) {
  return (
    <div
      className={
        "flex flex-col bg-white my-3 py-2 px-2 2xl:px-3 w-full rounded cursor-pointer select-none border-2 " +
        (props.selected ? "border-blue-400 shadow-xl" : "border-white")
      }
      onClick={() => props.changeSelected(props.item)}
    >
      <div className="flex justify-between items-start w-full mb-2">
        <h2 className="font-black text-2xs 2xl:text-base uppercase w-2/3 whitespace-nowrap overflow-ellipsis overflow-hidden">
          {props.item.title}
        </h2>
        <div className="flex w-1/3 text-xs 2xl:text-base items-center justify-end">
          <FaRegEdit className="cursor-pointer" />
          <FaRegCopy className="mx-1 2xl:mx-3 cursor-pointer" />
          <MdDelete className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col text-2xs xl:text-base">
        <div className="flex w-full items-center justify-end mt-1">
          <span className="uppercase">Quality</span>
          <ScheduleRating val={props.item.quality} type="quality" />
        </div>
        <div className="flex w-full items-center justify-end mt-1">
          <span className="uppercase">instructor</span>
          <ScheduleRating val={props.item.instructor} type="instructor" />
        </div>
        <div className="flex w-full items-center justify-end mt-1">
          <span className="uppercase">difficulty</span>
          <ScheduleRating val={props.item.difficulty} type="difficulty" />
        </div>
        <div className="flex w-full items-center justify-end mt-1">
          <span className="uppercase">workload</span>
          <ScheduleRating val={props.item.workload} type="workload" />
        </div>
      </div>
    </div>
  );
}

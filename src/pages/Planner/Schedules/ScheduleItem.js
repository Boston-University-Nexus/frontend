import React from "react";

import { FaRegEdit, FaRegCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ScheduleRating from "./ScheduleRating";

export default function ScheduleItem(props) {
  return (
    <div className="flex flex-col bg-white my-3 py-2 px-3 shadow-xl w-full rounded">
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="font-black text-sm xl:text-md uppercase">
          {props.item.title}
        </h2>
        <div className="flex">
          <FaRegEdit className="cursor-pointer" />
          <FaRegCopy className="mx-3 cursor-pointer" />
          <MdDelete className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex w-full justify-end">
          <span className="uppercase">course quality</span>
          <ScheduleRating val={props.item.quality} type="quality" />
        </div>
        <div className="flex w-full justify-end">
          <span className="uppercase">instructor quality</span>
          <ScheduleRating val={props.item.instructor} type="instructor" />
        </div>
        <div className="flex w-full justify-end">
          <span className="uppercase">course difficulty</span>
          <ScheduleRating val={props.item.difficulty} type="difficulty" />
        </div>
        <div className="flex w-full justify-end">
          <span className="uppercase">average workload</span>
          <ScheduleRating val={props.item.workload} type="workload" />
        </div>
      </div>
    </div>
  );
}

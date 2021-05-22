import React, { Component } from "react";
import { IoMdAddCircle } from "react-icons/io";

import ScheduleItem from "./ScheduleItem";

const testSchedules = [
  {
    title: "Recommended",
    quality: 5,
    instructor: 5,
    difficulty: 2,
    workload: 2,
  },
  {
    title: "Prioritize major",
    quality: 2,
    instructor: 3,
    difficulty: 5,
    workload: 3,
  },
  {
    title: "Prioritize hubs",
    quality: 4,
    instructor: 3,
    difficulty: 2,
    workload: 4,
  },
];

export default class Schedules extends Component {
  render() {
    return (
      <div className="w-1/5 h-full bg-blue-100 p-2 px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-black text-lg xl:text-xl uppercase">schedules</h1>
          <button className="text-2xl">
            <IoMdAddCircle />
          </button>
        </div>
        {testSchedules.map((item, key) => {
          return <ScheduleItem item={item} key={key} />;
        })}
      </div>
    );
  }
}

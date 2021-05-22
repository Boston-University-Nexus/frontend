import React, { Component } from "react";

import CalendarGraph from "./CalendarGraph";
import CalendarStats from "./CalendarStats";

const testStats = {
  quality: 3,
  instructor: 4,
  difficulty: 2,
  workload: 4.5,
  majorClasses: 2,
  hubClasses: 2,
  newHubs: 3,
  hoursDay: 1.7,
  hoursWeek: 8.5,
  earliest: "8 AM",
  latest: "4 PM",
};

export default class Calendar extends Component {
  render() {
    return (
      <div className="w-4/5 h-full bg-white p-2 px-4">
        <h1 className="font-black text-lg xl:text-xl uppercase">
          prioritize major
        </h1>
        <CalendarGraph />
        <CalendarStats stats={testStats} />
      </div>
    );
  }
}

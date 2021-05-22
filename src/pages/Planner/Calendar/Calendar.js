import React, { Component } from "react";

import CalendarGraph from "./CalendarGraph";
import CalendarStats from "./CalendarStats";

const sectionTest = {
  id: 1,
  title: "CAS CS 112 A1",
  professor: "Papadakis",
  location: "CAS 202",
};

export default class Calendar extends Component {
  render() {
    return (
      <div className="w-4/5 h-full bg-white p-2 px-4">
        <h1 className="font-black text-lg xl:text-xl uppercase">
          prioritize major
        </h1>
        <CalendarGraph />
        <CalendarStats />
      </div>
    );
  }
}

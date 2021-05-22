import React, { Component } from "react";

import CalendarItem from "./CalendarItem";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const hours = [7, 19];

// TESTING
const activeSections = [
  {
    id: 0,
    title: "CAS CS 112 A1",
    professor: "Papadakis",
    location: "CAS 202",
    days: ["monday", "wednesday", "friday"],
    start: "11:00",
    end: "11:55",
  },
  {
    id: 1,
    title: "CAS CS 132 B1",
    professor: "Raju",
    location: "COM 134",
    days: ["tuesday", "thursday"],
    start: "12:00",
    end: "13:15",
  },
];

export default class CalendarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.hours = this.hours.bind(this);
    this.days = this.days.bind(this);

    this.calendarRef = React.createRef();
  }

  hours() {
    let arr = [];
    for (let i = hours[0]; i < hours[1]; i++) {
      arr.push(
        <div
          className={
            "h-cal " + (i == hours[1] - 1 ? "" : "border-b border-gray-300")
          }
        ></div>
      );
    }

    return arr;
  }

  days() {
    let arr = [];
    for (const i of daysOfWeek) {
      arr.push(
        <div className="flex flex-col w-full relative">
          <div className="uppercase text-center text-gray-600 mb-2">{i}</div>
          <div
            className={
              "flex flex-col " +
              (i == daysOfWeek[0]
                ? "border border-gray-300"
                : "border border-l-0 border-gray-300")
            }
          >
            {this.hours()}
          </div>
          {this.state[i]}
        </div>
      );
    }

    return arr;
  }

  hourLeyend() {
    let arr = [];
    for (let i = hours[0]; i <= hours[1]; i++) {
      let text = i % 12;
      if (i > 12) text += " PM";
      else if (i == 12) text = "12 PM";
      else text += " AM";

      arr.push(
        <div className="h-cal w-full flex items-end justify-end text-gray-600">
          {text}
        </div>
      );
    }

    return arr;
  }

  componentDidMount() {
    for (const i of activeSections)
      for (const day of i.days)
        this.setState({ [day]: <CalendarItem section={i} /> });
  }

  render() {
    return (
      <div className="flex mt-10">
        <div className="flex w-full h-full overflow-hidden">
          <div className="flex flex-col w-1/12 mr-1 text-xs mt-3 xl:mt-0 xl:text-sm">
            {this.hourLeyend()}
          </div>
          <div className="flex w-11/12 h-full" ref={this.calendarRef}>
            {this.days()}
          </div>
        </div>
      </div>
    );
  }
}

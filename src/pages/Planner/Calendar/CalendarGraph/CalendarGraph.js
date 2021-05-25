import React, { Component } from "react";
import { connect } from "react-redux";

import CalendarItem from "./CalendarItem";
import { getCellHeight } from "./CalendarMethods";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const mapStateToProps = (state) => {
  return {
    calendars: state.calendars,
    activeSections: state.activeSections,
  };
};

const compareArrOfObj = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (
      arr1[i].title != arr2[i].title ||
      arr1[i].displayed != arr2[i].displayed
    ) {
      return false;
    }
  }

  return true;
};

// Will probably be replaced by a library
class CalendarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSections: {}, // The current calendar displayed
      sections: {}, // A dictionary containing all section items
      cellHeight: null,
    };

    this.hours = this.hours.bind(this);
    this.days = this.days.bind(this);
    this.generateSections = this.generateSections.bind(this);

    this.calendarStart = 7; // Earliest hour displayed
    this.calendarEnd = 19; // Latest hour displayed

    this.calendarRef = React.createRef();
  }

  // Returns a cell for every hour in a day
  hours() {
    let arr = [];
    for (let i = this.calendarStart; i < this.calendarEnd; i++) {
      arr.push(
        <div
          className={
            i == this.calendarEnd - 1 ? "" : "border-b border-gray-300"
          }
          style={{ height: this.state.cellHeight + "px" }}
          key={i}
        ></div>
      );
    }

    return arr;
  }

  // Returns a day for every day of the week (with all hours in it)
  days() {
    let arr = [];
    for (const i of daysOfWeek) {
      arr.push(
        <div className="flex flex-col w-full relative" key={i}>
          <div
            className="uppercase text-gray-600 flex items-center justify-center text-sm xl:text-base"
            style={{ height: this.state.cellHeight + "px" }}
          >
            {i}
          </div>
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
          {this.state.sections[i]}
        </div>
      );
    }

    return arr;
  }

  // Returns the hour text next to the scheduler
  hourLeyend() {
    let arr = [];
    for (let i = this.calendarStart; i <= this.calendarEnd; i++) {
      let text = i % 12;
      if (i > 12) text += " PM";
      else if (i == 12) text = "12 PM";
      else text += " AM";

      arr.push(
        <div
          className="w-full flex items-center justify-end text-gray-600"
          style={{ height: this.state.cellHeight + "px" }}
          key={i}
        >
          {text}
        </div>
      );
    }

    return arr;
  }

  componentDidUpdate() {
    // Only update if active calendar changed
    let same = compareArrOfObj(
      this.state.activeSections,
      this.props.activeSections
    );

    if (!same) {
      // Save state so we know what the current calendar is
      this.setState(
        {
          activeSections: JSON.parse(JSON.stringify(this.props.activeSections)),
        },
        () => this.generateSections(this.state.activeSections)
      );
    }
  }

  // On resize this is called
  resize() {
    let cellHeight = getCellHeight(window.innerWidth);
    this.setState({ cellHeight });
  }

  componentWillMount() {
    // Gets cell height according to current window width
    let cellHeight = getCellHeight(window.innerWidth);
    window.addEventListener("resize", this.resize.bind(this));

    let sectionsList = JSON.parse(JSON.stringify(this.props.activeSections));

    this.setState({ cellHeight });
    this.generateSections(sectionsList);
  }

  // Generates all the calendar sections in their corresponding day
  generateSections(sectionsList) {
    let sections = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };

    sectionsList.map((section) => {
      if (!(section.displayed === false))
        return section.days.map((day) => {
          return sections[day].push(
            <CalendarItem
              section={section}
              h={this.state.cellHeight}
              key={section.id}
              start={this.calendarStart}
            />
          );
        });
    });

    this.setState({ sections });
  }

  render() {
    return (
      <div className="flex mt-10 w-full">
        <div className="flex w-full h-full overflow-hidden">
          <div
            className="flex flex-col w-1/12 mr-1 text-xs xl:mt-0 xl:text-sm"
            style={{ marginTop: this.state.cellHeight / 2 + "px" }}
          >
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

export default connect(mapStateToProps)(CalendarGraph);

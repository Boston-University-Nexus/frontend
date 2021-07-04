import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import CalendarItem from "./CalendarItem";

// Functions
import { getCellHeight } from "./CalendarMethods";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

// Redux
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
      arr1[i].title !== arr2[i].title ||
      arr1[i].displayed !== arr2[i].displayed
    ) {
      return false;
    }
  }

  return true;
};

class CalendarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSections: [], // The current calendar displayed
      sections: {}, // A dictionary containing all section items
      cellHeight: null, // Dinamically sets cell height
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
            i === this.calendarEnd - 1 ? "" : "border-b border-gray-300"
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
            className="uppercase text-gray-600 flex items-center justify-center text-xs lg:text-sm xl:text-base"
            style={{ height: window.innerHeight * 0.05 + "px" }}
          >
            {window.innerWidth > 768 ? i : i.substring(0, 3)}
          </div>
          <div
            className={
              "flex flex-col " +
              (i === daysOfWeek[0]
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
      else if (i === 12) text = "12 PM";
      else text += " AM";

      arr.push(
        <div
          className="w-full flex items-center justify-end text-gray-600 whitespace-nowrap text-xs md:text-md transform -translate-y-1/2"
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
      // Get first and last class
      let bestStart = 24;
      let bestEnd = 0;
      for (const section of this.props.activeSections) {
        let start = parseInt(section.start.substring(0, 2));
        let end = parseInt(section.end.substring(0, 2));

        if (start - 1 < bestStart) bestStart = start - 1;
        if (end + 1 > bestEnd) bestEnd = end + 1;
      }
      this.calendarEnd = bestEnd;
      this.calendarStart = bestStart;

      // Gets cell height according to current window width and start/end
      let cellHeight = getCellHeight(bestStart, bestEnd);
      this.setState({ cellHeight });

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
    this.setState({ cellHeight }, () =>
      this.generateSections(this.state.activeSections)
    );
  }

  componentWillMount() {
    // Deep copy of sections to avoid shallow copy reference changing
    let sectionsList = JSON.parse(JSON.stringify(this.props.activeSections));

    // Get first and last class
    let bestStart = 24;
    let bestEnd = 0;
    for (const section of sectionsList) {
      let start = parseInt(section.start.substring(0, 2));
      let end = parseInt(section.end.substring(0, 2));

      if (start - 1 < bestStart) bestStart = start - 1;
      if (end + 1 > bestEnd) bestEnd = end + 1;
    }
    this.calendarEnd = bestEnd;
    this.calendarStart = bestStart;

    // Gets cell height according to current window width and start/end
    let cellHeight = getCellHeight(bestStart, bestEnd);
    window.addEventListener("resize", this.resize.bind(this));

    // Generating calendar
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
      return <></>;
    });

    this.setState({ sections });
  }

  render() {
    return (
      <div className="flex w-full items-start">
        <div className="flex w-full h-full overflow-hidden items-start">
          <div
            className="flex flex-col w-1/12 mr-1 text-xs xl:mt-0 xl:text-sm"
            style={{ marginTop: window.innerHeight * 0.05 + "px" }}
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

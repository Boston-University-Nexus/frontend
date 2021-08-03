import React, { Component } from "react";
import { connect } from "react-redux";
import { request } from "../../../../middlewares/requests";
import {
  stateSaveCourses,
  stateSaveSchedules,
  stateSetPopups,
  stateSetVisibleSections,
} from "../../../../state/actions";

// Components
import CalendarItem from "./CalendarItem";

// Functions
import { getCellHeight } from "./CalendarMethods";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const compareArrOfObj = (arr1, arr2) => {
  if (!arr1 || !arr2) return true;
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
          {this.state.sections[i.slice(0, 1).toUpperCase() + i.slice(1, 3)]}
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
      this.props.stateVisibleSections
    );

    if (!same) {
      // Get first and last class
      let bestStart = 24;
      let bestEnd = 0;

      for (const section of this.props.stateVisibleSections) {
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
          activeSections: JSON.parse(
            JSON.stringify(this.props.stateVisibleSections)
          ),
        },
        () => {
          if (this.props.stateLoggedIn) {
            this.generateSections(this.state.activeSections);
          }
        }
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

  // Load schedule from backend (if logged in)
  componentWillMount() {
    if (this.props.stateLoggedIn)
      request.get(process.env.REACT_APP_SERVER + "schedules/").then((res) => {
        if (res && !res.error) {
          this.props.stateSaveSchedules(res.data);
        } else if (!res) {
          this.props.stateSaveSchedules([[{ sections: [] }]]);
        } else {
          this.props.stateSetPopups({
            ...this.props.statePopups,
            rateLimit: true,
          });
        }
      });
  }

  // Generates all the calendar sections in their corresponding day
  generateSections(sectionsList) {
    let sections = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
    };

    sectionsList.map((section, id) => {
      if (!(section.displayed === false))
        return section.days.split(",").map((day) => {
          return sections[day].push(
            <CalendarItem
              section={section}
              colorId={id}
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

// Redux
const mapStateToProps = (state) => {
  return {
    stateSchedules: state.root.stateSchedules,
    stateVisibleSections: state.root.stateVisibleSections,
    stateLoggedIn: state.users.stateLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSaveCourses: (calendars) => dispatch(stateSaveCourses(calendars)),
    stateSaveSchedules: (calendar) => dispatch(stateSaveSchedules(calendar)),
    stateSetVisibleSections: (sections) =>
      dispatch(stateSetVisibleSections(sections)),
    stateSetPopups: (sections) => dispatch(stateSetPopups(sections)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarGraph);

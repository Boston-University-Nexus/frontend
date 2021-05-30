import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import CalendarGraph from "./CalendarGraph/CalendarGraph";
import CalendarStats from "./CalendarStats";
import ScheduleList from "./ScheduleList";

// Fake stats to test with
const testStats = {
  quality: "3.0",
  instructor: "4.0",
  difficulty: "2.0",
  workload: 4.5,
  majorClasses: 2,
  hubClasses: 2,
  newHubs: 3,
  hoursDay: 1.7,
  hoursWeek: 8.5,
  earliest: "8:00 AM",
  latest: "4:00 PM",
};

// Redux
const mapStateToProps = (state) => {
  return {
    activeCalendar: state.activeCalendar,
  };
};

class Calendar extends Component {
  render() {
    return (
      <>
        {this.props.activeCalendar && (
          <div className="w-4/5 h-full bg-white p-4 flex flex-col items-center justify-between">
            <div className="flex w-full items-center justify-start">
              <h1 className="font-bold text-2xl uppercase">
                Schedule
              </h1>
              <ScheduleList />
            </div>
            <CalendarGraph />
            <CalendarStats stats={testStats} />
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(Calendar);

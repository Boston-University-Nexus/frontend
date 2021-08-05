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
    stateActiveSchedule: state.root.stateActiveSchedule,
  };
};

class Calendar extends Component {
  render() {
    return (
      <>
        {this.props.stateActiveSchedule && (
          <div className="w-full sm:w-3/4 2xl:w-4/5 h-full bg-white p-4 flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center">
              <div className="flex w-full items-center justify-start mb-3">
                <h1 className="font-bold text-xl lg:text-2xl uppercase">
                  Schedule
                </h1>
                <ScheduleList />
              </div>
              <CalendarGraph />
            </div>
            <CalendarStats stats={testStats} />
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(Calendar);

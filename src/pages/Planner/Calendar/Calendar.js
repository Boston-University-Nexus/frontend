import React, { Component } from "react";
import { connect } from "react-redux";

import CalendarGraph from "./CalendarGraph/CalendarGraph";
import CalendarStats from "./CalendarStats";
import ScheduleList from "./ScheduleList";

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
          <div className="w-4/5 h-full bg-white p-2 px-4 flex flex-col items-center justify-between">
            <div className="flex w-full items-center justify-start">
              <h1 className="font-black text-lg xl:text-xl uppercase text-left">
                Schedules
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

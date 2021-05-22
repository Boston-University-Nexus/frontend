import React, { Component } from "react";
import OverallStatistics from "../../components/OverallStatistics";
import Schedule from "../../components/Schedule";

export class CalendarSection extends Component {
  render() {
    return (
      <div className="bg-white shadow-xl col-span-2 select-none">
        <Schedule />
        <OverallStatistics />
      </div>
    );
  }
}

export default CalendarSection;

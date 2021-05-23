import React, { Component } from "react";
import { connect } from "react-redux";

import CalendarItem from "./CalendarItem";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

const hours = [7, 19];

const mapStateToProps = (state) => {
  return {
    calendars: state.calendars,
    activeCalendar: state.activeCalendar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// Will probably be replaced by a library
class CalendarGraph2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="flex mt-10"></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarGraph2);

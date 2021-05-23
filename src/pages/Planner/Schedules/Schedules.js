import React, { Component } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { connect } from "react-redux";

import ScheduleItem from "./ScheduleItem";
import { changeCalendar } from "../../../state/actions";

const mapStateToProps = (state) => {
  return {
    calendars: state.calendars,
    activeCalendar: state.activeCalendar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCalendar: (calendar) => dispatch(changeCalendar(calendar)),
  };
};

class Schedules extends Component {
  constructor(props) {
    super(props);

    this.changeSchedule = this.changeSchedule.bind(this);
  }

  changeSchedule(calendar) {
    this.props.changeCalendar(calendar);
  }

  render() {
    return (
      <div className="w-1/5 h-full bg-blue-100 p-2 px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-black text-lg xl:text-xl uppercase">schedules</h1>
          <button className="text-2xl">
            <IoMdAddCircle />
          </button>
        </div>
        {this.props.calendars.map((item, key) => {
          let selected = this.props.activeCalendar == item;
          return (
            <ScheduleItem
              item={item}
              key={key}
              selected={selected}
              changeSelected={this.changeSchedule}
            />
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);

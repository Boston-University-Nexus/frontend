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
class CalendarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCalendar: {},
      sections: {},
      cellHeight: null,
    };

    this.hours = this.hours.bind(this);
    this.days = this.days.bind(this);

    this.calendarRef = React.createRef();
  }

  hours() {
    let arr = [];
    for (let i = hours[0]; i < hours[1]; i++) {
      arr.push(
        <div
          className={i == hours[1] - 1 ? "" : "border-b border-gray-300"}
          style={{ height: this.state.cellHeight + "px" }}
          key={i}
        ></div>
      );
    }

    return arr;
  }

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

  hourLeyend() {
    let arr = [];
    for (let i = hours[0]; i <= hours[1]; i++) {
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
    if (
      this.props.activeCalendar &&
      this.props.activeCalendar.id != this.state.activeCalendar.id
    ) {
      this.setState({ activeCalendar: this.props.activeCalendar });

      // Add classes according to received data
      this.generateSections(this.props.activeCalendar);
    }
  }

  resize() {
    let cellHeight = 45 - (23 * (1920 - window.innerWidth)) / 1152;
    this.setState({ cellHeight });
  }

  componentWillMount() {
    let cellHeight = 45 - (23 * (1920 - window.innerWidth)) / 1152;
    window.addEventListener("resize", this.resize.bind(this));

    this.setState(
      {
        activeCalendar: this.props.activeCalendar,
        cellHeight,
      },
      () => this.generateSections(this.props.activeCalendar)
    );
  }

  generateSections(calendar) {
    let sections = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };

    calendar.sections.map((section) => {
      return section.days.map((day) => {
        return sections[day].push(
          <CalendarItem
            section={section}
            h={this.state.cellHeight}
            key={section.id}
          />
        );
      });
    });

    this.setState({ sections });
  }

  render() {
    return (
      <div className="flex mt-10">
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarGraph);

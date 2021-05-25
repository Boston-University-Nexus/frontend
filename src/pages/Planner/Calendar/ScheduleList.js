import React, { Component } from "react";
import { connect } from "react-redux";

import { IoIosArrowDown } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt, FaCopy } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

import { changeCalendar } from "../../../state/actions";

const mapStateToProps = (state) => {
  return {
    activeCalendar: state.activeCalendar,
    calendars: state.calendars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCalendar: (calendar) => dispatch(changeCalendar(calendar)),
  };
};

class ScheduleList extends Component {
  constructor(props) {
    super(props);

    this.scheduleDrop = React.createRef();

    this.changeCalendar = this.changeCalendar.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = { open: false };
  }

  changeCalendar(e) {
    let itemTitle = e.target.value;

    for (const schedule of this.props.calendars) {
      if (schedule.title.toLowerCase() === itemTitle.toLowerCase()) {
        this.props.changeCalendar(schedule);
      }
    }
  }

  handleClick(e) {
    if (
      this.state.open &&
      this.scheduleDrop &&
      !this.scheduleDrop.current.contains(e.target)
    ) {
      this.setState({ open: false });
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick.bind(this));
  }

  render() {
    return (
      <div
        className="ml-3 relative bg-gray-200 rounded-full px-3 flex items-center capitalize cursor-pointer select-none w-42"
        ref={this.scheduleDrop}
      >
        <div
          className="flex items-center w-full"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          {this.props.activeCalendar.title}
          <IoIosArrowDown />
        </div>
        {this.state.open && (
          <div className="absolute top-full mt-3 left-0 shadow-2xl rounded-lg flex flex-col w-64 overflow-hidden z-30 border">
            {this.props.calendars.map((item, key) => {
              let selected = item.title === this.props.activeCalendar.title;
              return (
                <div
                  className={
                    "p-4 hover:bg-blue-100 flex items-center justify-between " +
                    (selected ? "bg-blue-100" : "bg-white")
                  }
                  key={key}
                  onClick={() => {
                    this.setState({ open: false });
                    this.props.changeCalendar(item);
                  }}
                >
                  <div className="flex items-center w-2/3">
                    <AiOutlineStar />
                    <span className="ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex text-gray-500 text-sm">
                    <MdModeEdit />
                    <FaCopy className="xl:mx-1" />
                    <FaTrashAlt />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);

import React, { Component } from "react";
import { connect } from "react-redux";

// Icons
import {
  FaTrashAlt,
  FaCopy,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
} from "react-icons/fa";
import { FiStar } from "react-icons/fi";

// Functions
import { stateSetSchedule } from "../../../state/actions";

class ScheduleList extends Component {
  constructor(props) {
    super(props);

    this.scheduleDrop = React.createRef();

    this.changeToSchedule = this.changeToSchedule.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = { open: false };
  }

  // Changes displayed calendar in state
  changeToSchedule(item) {
    for (const schedule of this.props.stateSchedules) {
      if (schedule.title.toLowerCase() === item.title.toLowerCase()) {
        this.props.stateSetSchedule(schedule);
      }
    }
  }

  // Closes popup when clicked outside
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
        className="ml-5 relative bg-gray-200 text-gray-600 rounded-full flex items-center capitalize cursor-pointer select-none font-bold"
        ref={this.scheduleDrop}
      >
        {/* Dropdown */}
        <div
          className="flex px-4 py-0.5 items-center w-full"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          {this.props.stateActiveSchedule.title}
          {this.state.open ? (
            <FaChevronUp className="ml-2" />
          ) : (
            <FaChevronDown className="ml-2" />
          )}
        </div>
        <div
          className={
            "absolute top-full mt-3 left-0 shadow-2xl rounded-lg flex flex-col w-64 overflow-hidden z-30 border transition-opacity " +
            (this.state.open ? "opacity-100" : "invisible opacity-0")
          }
        >
          {/* For every calendar saved in state */}
          {this.props.stateSchedules &&
            this.props.stateSchedules.map((item, key) => {
              let selected =
                item.title === this.props.stateActiveSchedule.title;
              return (
                <div
                  className={
                    "px-3 py-4 hover:bg-blue-100 flex items-center justify-between " +
                    (selected ? "bg-blue-100" : "bg-white")
                  }
                  key={key}
                  onClick={() => {
                    this.changeToSchedule(item);
                  }}
                >
                  <div className="flex items-center w-2/3">
                    <FiStar />
                    <span className="ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex text-gray-500 text-sm">
                    <FaEdit className="hover:text-gray-400" />
                    <FaCopy className="mx-1 hover:text-gray-400" />
                    <FaTrashAlt className="hover:text-gray-400" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateActiveSchedule: state.root.stateActiveSchedule,
    stateSchedules: state.root.stateSchedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSetSchedule: (calendar) => dispatch(stateSetSchedule(calendar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);

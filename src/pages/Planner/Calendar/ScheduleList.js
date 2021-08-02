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
import { changeCalendar } from "../../../state/actions";

// Redux
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
    // Changes displayed calendar in state
    let itemTitle = e.target.value;

    for (const schedule of this.props.calendars) {
      if (schedule.title.toLowerCase() === itemTitle.toLowerCase()) {
        this.props.changeCalendar(schedule);
      }
    }
  }

  handleClick(e) {
    // Closes popup when clicked outside
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
    console.log("T", this.props.calendars);
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
          {this.props.activeCalendar.title}
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
          {this.props.calendars &&
            this.props.calendars.map((item, key) => {
              let selected = item.title === this.props.activeCalendar.title;
              return (
                <div
                  className={
                    "px-3 py-4 hover:bg-blue-100 flex items-center justify-between " +
                    (selected ? "bg-blue-100" : "bg-white")
                  }
                  key={key}
                  onClick={() => {
                    this.props.changeCalendar(item);
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);

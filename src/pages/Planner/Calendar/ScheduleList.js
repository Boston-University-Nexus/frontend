import React, { useState } from "react";
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

function ScheduleList(props) {
  const [open, setOpen] = useState(false);

  // Changes displayed calendar in state
  const changeToSchedule = (item) => {
    for (const schedule of props.stateSchedules) {
      if (schedule.title.toLowerCase() === item.title.toLowerCase()) {
        props.stateSetSchedule(schedule);
        setOpen(false);
      }
    }
  };

  return (
    <div className="w-1/2 sm:w-auto ml-5 relative bg-gray-200 text-gray-600 rounded-full flex items-center capitalize cursor-pointer select-none">
      <div
        className="flex px-2 lg:px-4 lg:py-0.5 items-center w-full font-bold"
        onClick={() => setOpen(true)}
      >
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm lg:text-base">
          {props.stateActiveSchedule.title}
        </span>
        {open ? (
          <FaChevronUp className="ml-2" />
        ) : (
          <FaChevronDown className="ml-2" />
        )}
      </div>
      {open && (
        <>
          <div
            className="w-full h-full fixed top-0 left-0 z-50"
            onClick={() => setOpen(false)}
          ></div>
          <div className="absolute top-full mt-3 right-0 sm:left-0 shadow-2xl rounded-lg flex flex-col w-64 overflow-hidden z-30 border transition-opacity z-50">
            {/* For every calendar saved in state */}
            {props.stateSchedules &&
              props.stateSchedules.map((item, key) => {
                let selected = item.title === props.stateActiveSchedule.title;
                return (
                  <div
                    className={
                      "px-2 lg:px-3 py-2 lg:py-4 hover:bg-blue-100 flex items-center justify-between " +
                      (selected ? "bg-blue-100" : "bg-white")
                    }
                    key={key}
                    onClick={() => {
                      changeToSchedule(item);
                    }}
                  >
                    <div className="flex items-center w-2/3 text-sm lg:text-base">
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
        </>
      )}
    </div>
  );
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

import React, { Component } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import ClassItem from "./ClassSection/ClassItem";

import { stateSetPopups } from "../../state/actions";
import { connect } from "react-redux";

class Recommended extends Component {
  render() {
    // If menu is displayed
    let isOpen = this.props.open;

    return (
      <div
        className={
          "bg-white shadow-xl flex flex-col w-full overflow-hidden justify-center transition-all " +
          (isOpen ? "h-2/3" : "h-16")
        }
      >
        <div className="bg-white p-4 flex uppercase font-bold flex justify-between items-center">
          <span className="font-bold text-sm lg:text-lg xl:text-2xl mr-1">
            recommended
          </span>

          {/* TOGGLE BUTTON */}
          <button
            className="bg-gray-600 text-white text-xs lg:text-sm px-1 lg:px-2 rounded-full focus:outline-none py-1 font-bold mr-1"
            onClick={() => {
              if (this.props.stateLoggedIn) this.props.toggleMenu();
              else
                this.props.stateSetPopups({
                  ...this.props.statePopups,
                  needLogin: true,
                });
            }}
          >
            {isOpen ? (
              <div className="flex items-center justify-center uppercase">
                {window.innerWidth > 1024 && "hide "}
                <FaChevronDown />
              </div>
            ) : (
              <div className="flex items-center justify-center uppercase">
                {window.innerWidth > 1024 && "show "}
                <FaChevronUp />
              </div>
            )}
          </button>
        </div>
        {isOpen && (
          <>
            {/* INDICATES WHAT EACH ITEM IS */}
            <div className="p-2 pt-0 pl-4 flex uppercase font-bold text-gray-600 text-xs lg:text-sm xl:text-lg">
              <p className="w-3/5">course</p>
              <p className="w-1/5 text-center">qual</p>
              <p className="w-1/5 text-center">diff</p>
            </div>
            <div className="overflow-y-scroll h-full w-full">
              {/* JUST VISUALS FOR NOW */}
              <ClassItem
                item={{
                  course_title: "Test recommended",
                  course_department: "CS",
                  course_college: "CAS",
                  course_number: "112",
                  course_qualityRating: 2,
                  course_difficultyRating: 1,
                }}
                toggleMenu={this.props.toggleMenu}
              />
              <ClassItem
                item={{
                  course_title: "Test recommended",
                  course_department: "CS",
                  course_college: "CAS",
                  course_number: "132",
                  course_qualityRating: 3,
                  course_difficultyRating: 3,
                }}
                toggleMenu={this.props.toggleMenu}
              />
              <ClassItem
                item={{
                  course_title: "Test recommended",
                  course_department: "AS",
                  course_college: "CAS",
                  course_number: "100",
                  course_qualityRating: 5,
                  course_difficultyRating: 5,
                }}
                toggleMenu={this.props.toggleMenu}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    statePopups: state.events.statePopups,
    stateLoggedIn: state.users.stateLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSetPopups: (popups) => dispatch(stateSetPopups(popups)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);

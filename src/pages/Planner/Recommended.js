import React, { Component } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import ClassItem from "./ClassSection/ClassItem";

export default class Recommended extends Component {
  render() {
    // If menu is displayed
    let isOpen = this.props.open;

    return (
      <div
        className={
          "bg-white shadow-xl flex flex-col w-full overflow-hidden justify-center transition-all " +
          (isOpen ? "h-3/7" : "h-16")
        }
      >
        <div className="bg-white p-4 flex uppercase font-bold flex justify-between items-center">
          <span className="font-bold text-2xl">
            recommended
          </span>

          {/* TOGGLE BUTTON */}
          <button
            className="bg-gray-600 text-white text-sm px-2 rounded-full focus:outline-none px-3 py-1 font-bold"
            onClick={this.props.toggleMenu}
          >
            {isOpen ? (
              <div className="flex items-center justify-center uppercase">
                hide <FaChevronDown className="ml-1" />
              </div>
            ) : (
              <div className="flex items-center justify-center uppercase">
                show <FaChevronUp className="ml-1" />
              </div>
            )}
          </button>
        </div>
        {isOpen && (
          <>
            {/* INDICATES WHAT EACH ITEM IS */}
            <div className="p-2 pt-0 pl-4 flex uppercase font-bold text-gray-600 text-lg">
              <p className="w-3/5">course</p>
              <p className="w-1/5 text-center">qual</p>
              <p className="w-1/5 text-center">diff</p>
            </div>
            <div className="overflow-y-scroll h-full w-full">
              {/* JUST VISUALS FOR NOW */}
              <ClassItem
                item={{
                  title: "Test recommended",
                  department: "CS",
                  college: "CAS",
                  number: "123",
                }}
              />
              <ClassItem
                item={{
                  title: "Test recommended",
                  department: "CS",
                  college: "CAS",
                  number: "123",
                }}
              />
              <ClassItem
                item={{
                  title: "Test recommended",
                  department: "CS",
                  college: "CAS",
                  number: "123",
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

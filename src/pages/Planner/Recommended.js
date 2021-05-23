import React, { Component } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ClassItem from "./ClassSection/ClassItem";

export default class Recommended extends Component {
  render() {
    // If menu is displayed
    let isOpen = this.props.open;

    return (
      <div
        className={
          "bg-white shadow-xl flex flex-col w-full overflow-hidden justify-center " +
          (isOpen ? "h-3/7" : "h-16")
        }
        style={{ transition: "height 100ms" }} // For the animation
      >
        <div className="bg-white p-3 xl:p-5 flex uppercase font-bold flex justify-between items-center">
          <h2 className="font-black text-sm lg:text-base 2xl:text-xl">
            recommended
          </h2>

          {/* TOGGLE BUTTON */}
          <button
            className="bg-gray-600 text-white text-xs xl:text-sm px-2 rounded-full focus:outline-none ml-1 xl:ml-3"
            onClick={this.props.toggleMenu}
          >
            {isOpen ? (
              <div className="flex items-center justify-center">
                hide <IoIosArrowDown className="ml-1" />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                show <IoIosArrowUp className="ml-1" />
              </div>
            )}
          </button>
        </div>
        {isOpen && (
          <>
            {/* INDICATES WHAT EACH ITEM IS */}
            <div className="bg-white py-5 pl-5 pr-3 flex uppercase font-bold text-gray-500 border-b border-gray-300 text-xs lg:text-base">
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

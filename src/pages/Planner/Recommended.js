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
        style={{ transition: "height 100ms" }}
      >
        <div className="bg-white p-5 flex uppercase font-bold flex justify-between items-center">
          <h2 className="font-black text-xl">recommended</h2>

          {/* TOGGLE BUTTON */}
          <button
            className="bg-black text-white px-3 rounded-full focus:outline-none ml-3"
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
            <div className="bg-white p-5 flex uppercase font-bold text-gray-500  border-b border-gray-300">
              <p className="w-3/5">course</p>
              <p className="w-1/5 text-center">qual</p>
              <p className="w-1/5 text-center">diff</p>
            </div>
            <div className="overflow-y-auto h-full w-full">
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

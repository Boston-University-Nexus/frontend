import React from "react";
import { Component } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import "react-toastify/dist/ReactToastify.css";

// Helper function to get day initials
function getDayInits(arr) {
  let str = "";
  for (const day of arr) {
    if (day.toLowerCase() === "thursday") str += "r";
    else str += day.charAt(0);
  }

  return str.toUpperCase();
}

export default class CartItem extends Component {
  state = { checked: true, hovered: false, screenW: window.innerWidth };

  // Updates the checkboxes with their correct value
  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        checked: !(this.props.item.displayed === false),
      });
    }
  }

  componentDidMount() {
    this.setState({ checked: !(this.props.item.displayed === false) });
    window.addEventListener(
      "resize",
      function () {
        this.setState({ screenW: window.innerWidth });
      }.bind(this)
    );
  }

  render() {
    return (
      <div
        className="w-full h-26 flex items-center justify-between px-2 lg:px-4 py-5 border-b border-solid border-gray-400 cursor-pointer hover:bg-blue-200 transition-colors select-none"
        onClick={() => {
          this.props.updateCart(this.props.item.title, this.props.item);
          this.setState({ checked: !this.state.checked });
        }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <div className="flex items-center w-full">
          {this.state.checked ? (
            <ImCheckboxChecked
              className="text-xl text-blue-500"
              style={{
                minWidth: Math.max(this.state.screenW / 80, 10),
                width: Math.max(this.state.screenW / 80, 10),
              }}
            />
          ) : (
            <ImCheckboxUnchecked
              className="text-xl text-blue-500"
              style={{
                minWidth: Math.max(this.state.screenW / 80, 10),
                width: Math.max(this.state.screenW / 80, 10),
              }}
            />
          )}
          <div className="flex flex-col justify-center ml-2">
            <span className="font-bold text-xs md:text-sm lg:text-base whitespace-nowrap">
              {this.props.item.title}
            </span>
            <div className="flex items-center text-sm">
              <span className="font-bold mr-1 text-xs lg:text-sm">
                {getDayInits(this.props.item.days)}
              </span>
              <span className="text-xs lg:text-sm whitespace-nowrap">
                {this.props.item.start}-{this.props.item.end}
              </span>
            </div>
          </div>
        </div>
        <FaTrashAlt
          className={
            "text-xl text-gray-400 hover:text-red-500 transition " +
            (this.state.hovered ? "opacity-100" : "opacity-0")
          }
        />
      </div>
    );
  }
}

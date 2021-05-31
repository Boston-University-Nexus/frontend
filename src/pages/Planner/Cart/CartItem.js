import React from "react";
import { Component } from "react";
import { FaCheckSquare, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { FiSquare } from "react-icons/fi";

// Helper function to get day initials
function getDayInits(arr) {
  let str = "";
  for (const day of arr) {
    if (day.toLowerCase() == "thursday") str += "r";
    else str += day.charAt(0);
  }

  return str.toUpperCase();
}

export default class CartItem extends Component {
  state = { checked: true, hovered: false };

  // Updates the checkboxes with their correct value
  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({ checked: !(this.props.item.displayed === false) });
    }
  }

  componentDidMount() {
    this.setState({ checked: !(this.props.item.displayed === false) });
  }

  render() {
    return (
      <div
        className="w-full h-26 flex items-center justify-between px-4 py-5 border-b border-solid border-gray-400 cursor-pointer hover:bg-blue-200 transition-colors"
        onClick={() => {
          this.props.updateCart(this.props.item.title, this.props.item);
          this.setState({ checked: !this.state.checked });
        }}
        onMouseEnter={() => this.setState({hovered: true })}
        onMouseLeave={() => this.setState({hovered: false })}
      >
        {this.state.checked
          ? <FaCheckSquare className="text-xl text-blue-500" />
          : <FiSquare className="text-xl text-blue-500" />
        }
        <div className="flex flex-col justify-center">
          <span className="font-bold text-lg">{this.props.item.title}</span>
          <div className="flex items-center text-sm">
            <span className="font-bold mr-1">
              {getDayInits(this.props.item.days)}
            </span>
            <span>
              {this.props.item.start}-{this.props.item.end}
            </span>
          </div>
        </div>
        <FaInfoCircle className={"text-xl text-gray-400 hover:text-gray-600 transition-all " + (this.state.hovered ? "opacity-100" : "opacity-0" )} />
        <FaTrashAlt className={"text-xl text-gray-400 hover:text-red-500 transition-all " + (this.state.hovered ? "opacity-100" : "opacity-0" )} />
      </div>
    );
  }
}

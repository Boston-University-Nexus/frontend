import React from "react";
import { Component } from "react";

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
  state = { checked: true };

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
        className="w-full h-26 flex items-center p-3 border-b border-solid border-gray-400 cursor-pointer"
        onClick={() => {
          this.props.updateCart(this.props.item.title, this.props.item);
          this.setState({ checked: !this.state.checked });
        }}
      >
        <input
          type="checkbox"
          className="w-4 h-4 mr-2"
          checked={this.state.checked}
          readOnly={true}
        />
        <div className="flex flex-col justify-center">
          {this.props.item.title}
          <div className="flex items-center">
            <span className="font-bold mr-2">
              {getDayInits(this.props.item.days)}
            </span>
            <span>
              {this.props.item.start}-{this.props.item.end}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { connect } from "react-redux";

import ClassRating from "./ClassRating";
import { displayClass } from "../../../state/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    displayClass: (classes) => dispatch(displayClass(classes)),
  };
};

const mapStateToProps = (state) => {
  return {
    classStack: state.classStack,
  };
};

// The item displayed in the class section/recommended section
class ClassItem extends Component {
  constructor(props) {
    super(props);

    this.display = this.display.bind(this);
  }

  display() {
    this.props.toggleMenu(null, false);
    this.props.displayClass([...this.props.classStack, this.props.item]);
  }

  render() {
    let classCode =
      this.props.item.college +
      " " +
      this.props.item.department +
      " " +
      this.props.item.number;
    return (
      <div
        className="bg-white py-3 pl-4 pr-2 flex hover:bg-blue-100 cursor-pointer transition"
        onClick={this.display}
      >
        <div className="flex flex-col w-3/5">
          <span className="text-lg mr-3 font-bold">{classCode}</span>
          <span className="text-sm overflow-ellipsis w-full whitespace-nowrap overflow-hidden">
            {this.props.item.title}
          </span>
        </div>
        <ClassRating ratingType="Quality" val={this.props.item.quality} />
        <ClassRating ratingType="Difficulty" val={this.props.item.difficulty} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassItem);

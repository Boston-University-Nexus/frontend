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
    let classCode = this.props.item.course_code;
    return (
      <div
        className="bg-white py-3 pl-4 pr-2 flex hover:bg-blue-100 cursor-pointer transition justify-between items-center"
        onClick={this.display}
      >
        <div className="flex flex-col w-3/5">
          <span className="text-xs lg:text-base xl:text-lg mr-3 font-bold">
            {classCode}
          </span>
          <span className="text-xs lg:text-sm overflow-ellipsis w-full whitespace-nowrap overflow-hidden">
            {this.props.item.course_title}
          </span>
        </div>
        <div className="flex w-2/5 gap-1 justify-evenly items-center">
          <ClassRating
            ratingType="Quality"
            val={this.props.item.course_qualityRating}
          />
          <ClassRating
            ratingType="Difficulty"
            val={this.props.item.course_difficultyRating}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassItem);

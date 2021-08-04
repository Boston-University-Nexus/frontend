import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import { stateSaveSchedules, stateSetSchedule } from "../../../state/actions";

import CartItem from "./CartItem";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.updateCart = this.updateCart.bind(this);
  }

  updateCart(thisTitle) {
    // Copies state (avoids shallow copies)
    let calendars = [...this.props.stateSchedules];
    let currentSection;

    for (let i = 0; i < calendars.length; i++)
      if (calendars[i] === this.props.stateActiveSchedule) currentSection = i;

    // Finds and changes the appropiate class display property
    for (let j = 0; j < calendars[currentSection].sections.length; j++)
      if (calendars[currentSection].sections[j].title === thisTitle) {
        let currentVal = calendars[currentSection].sections[j].displayed;
        calendars[currentSection].sections[j].displayed =
          typeof currentVal === "undefined" ? false : !currentVal;
      }

    // Saves to state
    this.props.stateSaveSchedules(calendars);
    this.props.stateSetSchedule(calendars[currentSection]);
  }

  render() {
    return (
      <div className="w-1/4 2xl:w-1/5 h-full bg-blue-100 hidden sm:flex flex-col overflow-y-auto">
        {this.props.stateActiveSchedule.sections &&
          this.props.stateActiveSchedule.sections.map((item, key) => {
            return (
              <CartItem item={item} key={key} updateCart={this.updateCart} />
            );
          })}
      </div>
    );
  }
}
// Redux
const mapStateToProps = (state) => {
  return {
    stateVisibleSections: state.root.stateVisibleSections,
    stateActiveSchedule: state.root.stateActiveSchedule,
    stateSchedules: state.root.stateSchedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSaveSchedules: (calendars) => dispatch(stateSaveSchedules(calendars)),
    stateSetSchedule: (calendar) => dispatch(stateSetSchedule(calendar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeCalendar,
  saveCalendars,
  saveSections,
} from "../../../state/actions";

import CartItem from "./CartItem";

const mapStateToProps = (state) => {
  return {
    activeSections: state.activeSections,
    activeCalendar: state.activeCalendar,
    calendars: state.calendars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCalendars: (calendars) => dispatch(saveCalendars(calendars)),
    changeCalendar: (calendar) => dispatch(changeCalendar(calendar)),
  };
};

class Cart extends Component {
  constructor(props) {
    super(props);

    this.updateCart = this.updateCart.bind(this);
  }

  updateCart(thisTitle) {
    let calendars = [...this.props.calendars];
    let currentSection;

    for (let i = 0; i < calendars.length; i++)
      if (calendars[i] === this.props.activeCalendar) currentSection = i;

    for (let j = 0; j < calendars[currentSection].sections.length; j++)
      if (calendars[currentSection].sections[j].title === thisTitle) {
        let currentVal = calendars[currentSection].sections[j].displayed;
        calendars[currentSection].sections[j].displayed =
          typeof currentVal === "undefined" ? false : !currentVal;
      }

    this.props.saveCalendars(calendars);
    this.props.changeCalendar(calendars[currentSection]);
  }

  render() {
    return (
      <div className="w-1/5 h-full bg-blue-100 flex flex-col">
        {this.props.activeCalendar.sections &&
          this.props.activeCalendar.sections.map((item, key) => {
            return (
              <CartItem item={item} key={key} updateCart={this.updateCart} />
            );
          })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import React, { Component } from "react";
import { connect } from "react-redux";
import { stateSetPopups } from "../../state/actions";
import Cookies from "./Cookies";
import NeedLogin from "./NeedLogin";
import RateLimit from "./RateLimit";

class Popups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      popups: {
        rateLimit: false,
        needLogin: false,
      },
    };

    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(val) {
    let popups = { ...this.props.statePopups, [val]: false };
    let active = Object.values(popups).includes(true);

    this.props.stateSetPopups(popups);
    this.setState({ active, popups });
  }

  componentDidMount() {
    let popups = this.props.statePopups;
    let active = Object.values(popups).includes(true);
    this.setState({ active, popups });
  }

  componentDidUpdate() {
    let popups = this.props.statePopups;
    let active = Object.values(popups).includes(true);

    if (active !== this.state.active) {
      this.setState({ active, popups });
    }
  }

  render() {
    return (
      <>
        <Cookies />
        <div
          className="w-screen h-screen fixed justify-center items-center bg-black bg-opacity-70 top-0 left-0"
          style={
            this.state.active
              ? { zIndex: 1000, display: "flex" }
              : { display: "none" }
          }
        >
          {this.props.statePopups.rateLimit && (
            <RateLimit close={this.closePopup} />
          )}
          {this.props.statePopups.needLogin && (
            <NeedLogin close={this.closePopup} />
          )}
        </div>
      </>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    statePopups: state.events.statePopups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSetPopups: (boolean) => dispatch(stateSetPopups(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);

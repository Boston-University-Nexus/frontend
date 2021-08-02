import React, { Component } from "react";
import { connect } from "react-redux";
import { setPopups } from "../../state/actions";
import Cookies from "./Cookies";
import RateLimit from "./RateLimit";

// Redux
const mapStateToProps = (state) => {
  return {
    popups: state.popups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPopups: (boolean) => dispatch(setPopups(boolean)),
  };
};

class Popups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      popups: {
        rateLimit: false,
      },
    };

    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(val) {
    let popups = { ...this.props.popups, [val]: false };
    let active = Object.values(popups).includes(true);

    this.props.setPopups(popups);
    this.setState({ active, popups });
  }

  componentDidMount() {
    let popups = this.props.popups;
    let active = Object.values(popups).includes(true);
    this.setState({ active, popups });
  }

  componentDidUpdate() {
    let popups = this.props.popups;
    let active = Object.values(popups).includes(true);

    if (active != this.state.active) {
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
          {this.props.popups.rateLimit && <RateLimit close={this.closePopup} />}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popups);

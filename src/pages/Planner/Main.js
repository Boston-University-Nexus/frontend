import { Component } from "react";

// Components
import ClassList from "./ClassSection/ClassList";
import Calendar from "./Calendar/Calendar";
import Recommended from "./Recommended";
import Cart from "./Cart/Cart";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedOpen: this.props.stateLoggedIn,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  // Open and close the recommended menu
  toggleMenu(e, val) {
    if (typeof val !== "undefined")
      // Toggle the recommended menu
      this.setState({ recommendedOpen: val });
    else this.setState({ recommendedOpen: !this.state.recommendedOpen });
  }

  render() {
    return (
      <div className="justify-center items-center h-full bg-blue-300 p-4 flex-auto">
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex flex-col w-1/4 2xl:w-1/5 h-full overflow-hidden">
            <ClassList
              open={this.state.recommendedOpen}
              toggleMenu={this.toggleMenu}
            />
            <Recommended
              open={this.state.recommendedOpen}
              toggleMenu={this.toggleMenu}
            />
          </div>
          <div className="shadow-xl w-3/4 2xl:w-4/5 ml-4 h-full flex">
            <Calendar />
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

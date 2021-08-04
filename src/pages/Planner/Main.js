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
      <div className="flex justify-center items-center h-full sm:h-screen page bg-blue-300">
        <div className="flex flex-col sm:flex-row justify-center items-center h-full w-full p-2 sm:p-4">
          <div
            className="flex flex-col w-full sm:w-1/4 2xl:w-1/5 sm:h-full overflow-hidden"
            style={window.innerWidth < 640 ? { height: "90vh" } : {}}
          >
            <ClassList
              open={this.state.recommendedOpen}
              toggleMenu={this.toggleMenu}
            />
            <Recommended
              open={this.state.recommendedOpen}
              toggleMenu={this.toggleMenu}
            />
          </div>
          <div className="shadow-xl w-full sm:w-3/4 2xl:w-4/5 mt-6 sm:mt-0 sm:ml-4 h-full flex">
            <Calendar />
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

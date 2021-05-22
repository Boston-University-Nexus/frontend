import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { saveClasses } from "../../state/actions";
import ClassList from "./ClassSection/ClassList";
import Calendar from "./Calendar/Calendar";
import Recommended from "./Recommended";

const mapDispatchToProps = (dispatch) => {
  return {
    saveClasses: (classes) => dispatch(saveClasses(classes)),
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedOpen: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ recommendedOpen: !this.state.recommendedOpen });
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/classes/").then((response) => {
      this.props.saveClasses(response.data);
    });
  }

  render() {
    return (
      <div className="flex justify-center items-center h-full bg-blue-300 p-8 pt-24">
        <div className="flex justify-center items-center h-full w-full">
          <div className="flex flex-col items-center justify-between w-1/5 h-full overflow-hidden">
            <ClassList open={this.state.recommendedOpen} />
            <Recommended
              open={this.state.recommendedOpen}
              toggleMenu={this.toggleMenu}
            />
          </div>
          <div className="shadow-xl w-4/5 ml-3 h-full flex">
            <Calendar />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);

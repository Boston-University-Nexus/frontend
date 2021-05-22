import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { saveClasses } from "../../state/actions";
import ClassList from "./ClassList";
import Calendar from "./Calendar";
import Recommended from "./Recommended";

const mapDispatchToProps = (dispatch) => {
  return {
    saveClasses: (classes) => dispatch(saveClasses(classes)),
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/classes/").then((response) => {
      this.props.saveClasses(response.data);
    });
  }

  render() {
    return (
      <div className="flex justify-center items-center h-5/6 p-8 pb-0">
        <div className="flex justify-center items-center h-full w-full">
          <ClassList />
          <div className="shadow-xl w-4/5 ml-3 h-full flex">
            <Calendar />
            <Recommended />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);

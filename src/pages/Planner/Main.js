import { Component } from "react";
import { connect } from "react-redux";
import { request } from "../../middlewares/requests";

// Functions
import {
  changeCalendar,
  saveCalendars,
  saveClasses,
  saveSections,
  setPopups,
} from "../../state/actions";

// Components
import ClassList from "./ClassSection/ClassList";
import Calendar from "./Calendar/Calendar";
import Recommended from "./Recommended";
import Cart from "./Cart/Cart";

// Redux
const mapStateToProps = (state) => {
  return {
    popups: state.popups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveClasses: (classes) => dispatch(saveClasses(classes)),
    saveCalendars: (calendars) => dispatch(saveCalendars(calendars)),
    changeCalendar: (calendar) => dispatch(changeCalendar(calendar)),
    saveSections: (sections) => dispatch(saveSections(sections)),
    setPopups: (sections) => dispatch(setPopups(sections)),
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedOpen: true,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e, val) {
    if (typeof val !== "undefined")
      // Toggle the recommended menu
      this.setState({ recommendedOpen: val });
    else this.setState({ recommendedOpen: !this.state.recommendedOpen });
  }

  componentWillMount() {
    // Get calendars
    request.get(process.env.REACT_APP_SERVER + "schedules/").then((res) => {
      if (res && !res.error) {
        this.props.saveCalendars(res.data);
        this.props.changeCalendar(res.data[0]);
        this.props.saveSections(res.data[0].sections);
      } else if (!res) {
        this.props.saveCalendars([]);
        this.props.changeCalendar([]);
        this.props.saveSections([]);
      } else {
        this.props.setPopups({ ...this.props.popups, rateLimit: true });
      }
    });
  }

  render() {
    return (
      <div
        className="flex justify-center items-center h-screen bg-blue-300 p-4"
        style={{ paddingTop: 72 }}
      >
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

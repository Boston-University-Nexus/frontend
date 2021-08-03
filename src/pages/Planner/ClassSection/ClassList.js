import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import {
  stateDisplayCourse,
  stateSaveCourses,
  stateSetPopups,
} from "../../../state/actions";
import { filter } from "../Functions";

// Components
import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";
import ClassItem from "./ClassItem";
import ClassCard from "./ClassCard";

import { request } from "../../../middlewares/requests";

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTyped: false,
      hasMore: true,
      typedText: "",
      sql_page: 0,
      prev_query: "",
    };

    this.handleType = this.handleType.bind(this);
  }

  // Loads classes based on type
  handleType(e) {
    let prevTyped = this.state.typedText.replaceAll(" ", "").toLowerCase();
    let nowTyped = e.target.value.replaceAll(" ", "").toLowerCase();

    // If user deleted a character, pasted something different, or
    // there are more classes to load than what we received
    if (
      prevTyped.length > nowTyped.length ||
      nowTyped.substring(0, prevTyped.length) !== prevTyped ||
      this.state.hasMore
    ) {
      // Saved typed text to compare after
      this.setState({ typedText: e.target.value });

      // Delete class stack (for course cards)
      this.props.stateDisplayCourse([]);

      // Get type of query we should make
      let query = filter(nowTyped);

      if (query != "") {
        // Call helper function filter and reset state
        this.setState({
          prev_query: query,
          sql_page: 0,
        });
        request
          .get(process.env.REACT_APP_SERVER + "courses?" + query)
          .then((res) => {
            if (res && !res.error) {
              this.props.stateSaveCourses(res.data);
              this.setState({ hasMore: res.data.length === 300 });
            } else if (!res) this.props.stateSaveCourses([]);
            else {
              this.props.stateSetPopups({
                ...this.props.statePopups,
                rateLimit: true,
              });
            }
          });
      }
    } else if (prevTyped.length < nowTyped.length && !this.state.hasMore) {
      let courseCopy = [...this.props.stateCourses];

      // Javascript filter instead of DB query
      courseCopy = courseCopy.filter((a) => {
        return a.course_code.toLowerCase().includes(nowTyped);
      });

      this.props.stateSaveCourses(courseCopy);
    } else {
      this.props.stateSaveCourses([]);
    }
  }

  render() {
    return (
      <div className="bg-white shadow-xl flex flex-col w-full mb-4 overflow-hidden h-full">
        <SearchBar
          handleTypeSearch={this.handleType}
          isOpen={this.props.open}
        />

        {this.props.stateCourseStack.length === 0 && (
          <div
            className="flex flex-col w-full items-center justify-center"
            style={{ height: "calc(100% - 55px)" }}
          >
            {/* INDICATES WHAT EACH ITEM IS */}
            <div className="py-2 pl-4 pr-2 flex justify-between uppercase font-bold text-gray-600 text-xs lg:text-sm xl:text-lg w-full">
              <span className="w-3/5">course</span>
              <div className="flex w-2/5 justify-center items-center">
                <span className="text-center">qual/diff</span>
              </div>
            </div>

            {/* DISPLAYED CLASSES */}
            <div
              className="flex flex-col flex-grow w-full overflow-y-scroll h-5/6"
              onScroll={this.checkScroll}
            >
              {/* IF CLASSES */}
              {this.props.stateCourses.map((item, key) => {
                return (
                  <ClassItem
                    item={item}
                    key={key}
                    toggleMenu={this.props.toggleMenu}
                  />
                );
              })}

              {/* IF EMPTY SEARCH */}
              {this.props.stateCourses.length === 0 &&
                this.state.typedText.length < 1 && <StartTyping />}

              {/* IF NOT FOUND */}
              {this.props.stateCourses.length === 0 &&
                this.state.typedText.length > 0 && <NotFound />}
            </div>
          </div>
        )}
        {this.props.stateCourseStack.length > 0 && (
          <ClassCard
            item={
              this.props.stateCourseStack[
                this.props.stateCourseStack.length - 1
              ]
            }
          />
        )}
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    stateCourses: state.root.stateCourses,
    stateCourseStack: state.root.stateCourseStack,
    statePopups: state.events.statePopups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateSaveCourses: (classes) => dispatch(stateSaveCourses(classes)),
    stateDisplayCourse: (classes) => dispatch(stateDisplayCourse(classes)),
    stateSetPopups: (boolean) => dispatch(stateSetPopups(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);

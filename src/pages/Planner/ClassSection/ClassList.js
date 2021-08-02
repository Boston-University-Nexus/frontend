import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import { displayClass, saveClasses, setPopups } from "../../../state/actions";
import { filter } from "../Functions";

// Components
import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";
import ClassItem from "./ClassItem";
import ClassCard from "./ClassCard";

import { request } from "../../../middlewares/requests";

// Redux
const mapStateToProps = (state) => {
  return {
    classes: state.classes,
    classStack: state.classStack,
    popups: state.popups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveClasses: (classes) => dispatch(saveClasses(classes)),
    displayClass: (classes) => dispatch(displayClass(classes)),
    setPopups: (boolean) => dispatch(setPopups(boolean)),
  };
};

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTyped: false,
      typedText: "",
      sql_page: 0,
      prev_query: "",
      hasMore: true,
      loading: false,
    };

    this.handleType = this.handleType.bind(this);
    this.getMoreClasses = this.getMoreClasses.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
  }

  // Checks if user has scrolled to load more classes
  checkScroll(e) {
    let scrolledPercentage = e.target.scrollTop / e.target.scrollHeight;
    if (scrolledPercentage > 0.75 && this.state.hasMore) this.getMoreClasses();
  }

  // Loads more classes up
  getMoreClasses() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      request
        .get(
          process.env.REACT_APP_SERVER +
            "courses?" +
            this.state.prev_query +
            "&page=" +
            (this.state.sql_page + 1)
        )
        .then((res) => {
          let prevClasses = [...this.props.classes];
          if (prevClasses.length < 300) {
            this.props.saveClasses(prevClasses.concat(res.data));
            this.setState({
              sql_page: this.state.sql_page + 1,
              hasMore: true,
              loading: false,
            });
          }
        })
        .catch((err) => {
          this.setState({ hasMore: false });
        });
    }
  }

  // Loads classes based on type
  handleType(e) {
    // Is used to determine if we show "not found" or "start typing"
    this.setState({ typedText: e.target.value });
    this.props.displayClass([]);

    let searched = e.target.value.replaceAll(" ", "").toLowerCase();
    let query = filter(searched);

    if (query != "") {
      // Call helper function filter and reset state
      this.setState({
        prev_query: query,
        sql_page: 0,
        hasMore: true,
      });
      request
        .get(process.env.REACT_APP_SERVER + "courses?" + query)
        .then((res) => {
          if (res && !res.error) this.props.saveClasses(res.data);
          else if (!res) this.props.saveClasses([]);
          else {
            this.props.setPopups({ ...this.props.popups, rateLimit: true });
          }
        });
    } else {
      this.props.saveClasses([]);
    }
  }

  render() {
    let classList = this.props.classes;

    return (
      <div className="bg-white shadow-xl flex flex-col w-full mb-4 overflow-hidden h-full">
        <SearchBar
          handleTypeSearch={this.handleType}
          isOpen={this.props.open}
        />

        {this.props.classStack.length === 0 && (
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
              {classList &&
                classList.map((item, key) => {
                  return (
                    <ClassItem
                      item={item}
                      key={key}
                      toggleMenu={this.props.toggleMenu}
                    />
                  );
                })}

              {/* IF EMPTY SEARCH */}
              {classList.length === 0 && this.state.typedText.length < 1 && (
                <StartTyping />
              )}

              {/* IF NOT FOUND */}
              {classList.length === 0 && this.state.typedText.length > 0 && (
                <NotFound />
              )}
            </div>
          </div>
        )}
        {this.props.classStack.length > 0 && (
          <ClassCard
            item={this.props.classStack[this.props.classStack.length - 1]}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);

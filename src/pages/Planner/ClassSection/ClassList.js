import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import { displayClass, filterClasses } from "../../../state/actions";
import { filter } from "../Methods";

// Components
import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";
import ClassItem from "./ClassItem";
import ClassCard from "./ClassCard";

// Redux
const mapStateToProps = (state) => {
  return {
    displayedClasses: state.displayedClasses,
    classes: state.classes,
    classStack: state.classStack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterClasses: (classes) => dispatch(filterClasses(classes)),
    displayClass: (classes) => dispatch(displayClass(classes)),
  };
};

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTyped: false,
      typedText: "",
    };

    this.handleType = this.handleType.bind(this);
  }

  handleType(e) {
    // Is used to determine if we show "not found" or "start typing"
    this.setState({ typedText: e.target.value });
    this.props.displayClass([]);

    let numWords = e.target.value.split(" ").length;
    let val = e.target.value.toLowerCase().split(" ");

    // Call helper function filter
    let currentClasses = filter(numWords, this.props.classes, val);

    // Save to state
    this.props.filterClasses(currentClasses);
  }

  render() {
    let classList = this.props.displayedClasses.slice(0, 75);
    let isOpen = this.props.open;

    return (
      <div className="bg-white shadow-xl flex flex-col w-full mb-4 overflow-hidden h-full">
        <SearchBar handleType={this.handleType} isOpen={isOpen} />

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
            <div className="flex flex-col flex-grow w-full overflow-y-scroll h-5/6">
              {/* IF CLASSES */}
              {classList.map((item, key) => {
                return (
                  <ClassItem
                    item={item}
                    key={key}
                    toggleMenu={this.props.toggleMenu}
                  />
                );
              })}

              {/* IF EMPTY SEARCH */}
              {classList.length == 0 && this.state.typedText.length < 1 && (
                <StartTyping />
              )}

              {/* IF NOT FOUND */}
              {classList.length == 0 && this.state.typedText.length > 0 && (
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

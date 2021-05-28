import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import { filterClasses } from "../../../state/actions";
import { filter } from "../Methods";

// Components
import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";
import ClassItem from "./ClassItem";

// Redux
const mapStateToProps = (state) => {
  return {
    displayedClasses: state.displayedClasses,
    classes: state.classes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterClasses: (classes) => dispatch(filterClasses(classes)),
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

    let numWords = e.target.value.split(" ").length;
    let val = e.target.value.toLowerCase().split(" ");

    // Call helper function filter
    let currentClasses = filter(numWords, this.props.classes, val);

    // Save to state
    this.props.filterClasses(currentClasses);
  }

  render() {
    let classList = this.props.displayedClasses.slice(0, 10);

    return (
      <div className="bg-white shadow-xl flex flex-col w-full mb-4 flex-grow overflow-hidden">
        <SearchBar handleType={this.handleType} />

        {/* INDICATES WHAT EACH ITEM IS */}
        <div className="pt-3 pl-4 pr-2 flex uppercase font-bold text-gray-600 border-gray-300 text-lg">
          <span className="w-3/5">course</span>
          <span className="w-1/5 text-center">qual</span>
          <span className="w-1/5 text-center">diff</span>
        </div>

        {/* DISPLAYED CLASSES */}
        <div className="flex flex-col flex-grow w-full overflow-y-scroll">
          {/* IF CLASSES */}
          {classList.map((item, key) => {
            return <ClassItem item={item} key={key} />;
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);

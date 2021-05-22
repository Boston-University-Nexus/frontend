import React, { Component } from "react";
import { connect } from "react-redux";
import ClassItem from "./ClassItem";
import { filterClasses } from "../../../state/actions";
import { filter } from "../Methods";

import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";

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
    let currentClasses = filter(numWords, this.props.classes, val);

    this.props.filterClasses(currentClasses);
  }

  render() {
    let classList = this.props.displayedClasses.slice(0, 10);

    return (
      <div className="w-1/5 h-full bg-white shadow-xl flex flex-col">
        <SearchBar handleType={this.handleType} />
        <div className="bg-white p-5 border border-gray-200 flex uppercase font-bold text-gray-500">
          <p className="w-3/5">course</p>
          <p className="w-1/5 text-center">qual</p>
          <p className="w-1/5 text-center">diff</p>
        </div>
        <div className="overflow-y-auto h-full w-full">
          {classList.map((item, key) => {
            return <ClassItem item={item} key={key} />;
          })}
          {classList.length == 0 && this.state.typedText.length < 1 && (
            <StartTyping />
          )}
          {classList.length == 0 && this.state.typedText.length > 0 && (
            <NotFound />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);

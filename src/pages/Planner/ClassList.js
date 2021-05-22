import React, { Component } from "react";
import { connect } from "react-redux";
import ClassItem from "../../components/Planner/ClassList/ClassItem";
import { filterClasses } from "../../state/actions";
import { filter } from "./Methods";

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

    this.handleType = this.handleType.bind(this);
  }

  handleType(e) {
    let numWords = e.target.value.split(" ").length;
    let val = e.target.value.toLowerCase().split(" ");
    let currentClasses = filter(numWords, this.props.classes, val);

    this.props.filterClasses(currentClasses);
  }

  render() {
    let classList = this.props.displayedClasses.slice(0, 10);

    return (
      <div className="w-1/5 h-full bg-white shadow-xl flex flex-col">
        <input
          type="text"
          placeholder="Search classes..."
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Search classes...")}
          onChange={this.handleType}
          className="w-full text-3xl p-4 border-b border-gray-300 text-gray-700 focus:outline-none focus:border focus:border-solid focus:border-blue-500"
        />
        <div className="overflow-y-auto">
          {classList.map((item, key) => {
            return <ClassItem item={item} key={key} />;
          })}
          {classList.length == 0 && (
            <div className="bg-white p-3 py-2 flex-flex-col text-xl text-gray-500 w-full text-justify">
              No classes found... Try a different search
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);

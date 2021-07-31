import React, { Component } from "react";
import { connect } from "react-redux";

// Functions
import { displayClass, saveClasses } from "../../../state/actions";
import { filter } from "../Functions";

// Components
import NotFound from "./NotFound";
import StartTyping from "./StartTyping";
import SearchBar from "./SearchBar";
import ClassItem from "./ClassItem";
import ClassCard from "./ClassCard";
import config from "../../../config";
import axios from "axios";

// Redux
const mapStateToProps = (state) => {
  return {
    classes: state.classes,
    classStack: state.classStack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveClasses: (classes) => dispatch(saveClasses(classes)),
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

    let searched = e.target.value.replaceAll(" ", "").toLowerCase();
    let query = filter(searched);

    console.log(query);

    if (query != "") {
      // Call helper function filter
      axios.get(config["server"] + "courses?" + query).then((res) => {
        this.props.saveClasses(res.data);
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

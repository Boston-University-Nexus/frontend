import React, { Component } from "react";

// Icons
import { IoChevronBackOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

import { connect } from "react-redux";
import { displayClass } from "../../../state/actions";

// Redux
const mapStateToProps = (state) => {
  return {
    classStack: state.classStack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayClass: (classes) => dispatch(displayClass(classes)),
  };
};

class ClassCard extends Component {
  constructor(props) {
    super(props);

    this.removeClassFromStack = this.removeClassFromStack.bind(this);
  }

  removeClassFromStack() {
    let currentStack = [...this.props.classStack];
    currentStack.splice(currentStack.length - 1, 1);

    this.props.displayClass([...currentStack]);
  }

  render() {
    let item = this.props.item;
    console.log(item);
    return (
      <div className="w-full p-3">
        <button
          className="flex items-center justify-start text-gray-800 w-full focus:outline-none hover:text-black"
          onClick={this.removeClassFromStack}
        >
          <IoChevronBackOutline />
          Back
        </button>
        <h1 className="font-black lg:text-xl xl:text-2xl mt-3">
          {item.college + " " + item.department + " " + item.number}
        </h1>
        <h2 className="text-lg">{item.title}</h2>
        <div className="text-gray-700">
          <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 border inline-block border-solid border-blue-500 rounded-full px-2 bg-blue-100 hover:bg-blue-200 my-3 text-sm"
          >
            <span className="inline align-middle">
              View on Nexus Course Review
            </span>
            <FiExternalLink className="inline align-middle ml-1" />
          </a>
          {item.hubs.length > 0 && (
            <div className="flex text-sm">
              <p>Hub Areas:</p>
              {item.hubs.map((thisItem, key) => {
                return (
                  <div className="bg-gray-100 rounded-full">{thisItem}</div>
                );
              })}
              ; or equivalent.
            </div>
          )}
          {item.prereqs !== "" && (
            <div className="flex text-sm">
              <p>Prerequisites:</p>
              {item.prereqs.split(",").map((thisItem, key) => {
                return (
                  <>
                    <button
                      className="inline text-blue-500 font-bold ml-1"
                      onClick={() => this.addClassToStack(thisItem)}
                    >
                      {thisItem}
                    </button>
                    {key < item.prereqs.split(",").length - 1 ? ", " : ""}
                  </>
                );
              })}
              ; or equivalent.
            </div>
          )}
          <p className="text-sm mt-2">{item.description}</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassCard);

import React, { Component } from "react";

// Icons
import { IoChevronBackOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

import { connect } from "react-redux";
import { displayClass } from "../../../state/actions";
import axios from "axios";
import SectionItem from "./SectionItem";

const formatDescription = (descr) => {
  if (descr.length > 150) {
    return (
      <>
        {descr.substring(0, 150)}
        {"... "}
        <button className="text-blue-500 font-bold cursor-pointer hover:text-blue-700 inline">
          see more
        </button>
      </>
    );
  } else {
    return descr;
  }
};

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
    this.state = {
      currentClass: "",
      hubs: [],
      sections: [],
    };

    this.removeClassFromStack = this.removeClassFromStack.bind(this);
    this.getHubs = this.getHubs.bind(this);
  }

  getHubs() {
    let current = this.props.item;

    let url =
      "?course__college=" +
      current.college +
      "&course__department=" +
      current.department +
      "&course__number=" +
      current.number;

    // Get all hubs
    axios.get("http://localhost:8000/api/hub/" + url).then(
      function (response) {
        let arr = [];
        for (const item of response.data) {
          arr.push(item.buhub.name);
        }

        this.setState({ hubs: arr });
      }.bind(this)
    );
  }

  getSections() {
    let current = this.props.item;

    let url =
      "?course__college=" +
      current.college +
      "&course__department=" +
      current.department +
      "&course__number=" +
      current.number;

    // Get all sections
    axios.get("http://localhost:8000/api/" + url).then(
      function (response) {
        console.log(response.data);
        this.setState({ sections: response.data });
      }.bind(this)
    );
  }

  componentDidUpdate() {
    let current = this.props.item;

    if (current.title !== this.state.currentClass) {
      this.setState({ currentClass: current.title });
      this.getHubs();
      this.getSections();
    }
  }

  componentDidMount() {
    this.getHubs();
    this.getSections();

    let current = this.props.item;
    this.setState({ currentClass: current.title });
  }

  removeClassFromStack() {
    let currentStack = [...this.props.classStack];
    currentStack.splice(currentStack.length - 1, 1);

    this.props.displayClass([...currentStack]);
  }

  render() {
    let item = this.props.item;
    let hubs = this.state.hubs;

    return (
      <div className="w-full" style={{ height: "91.66%" }}>
        <div className="h-1/2 flex w-full items-start justify-start flex-col mb-3">
          <button
            className="flex items-center justify-start text-gray-800 w-full focus:outline-none hover:text-black m-3"
            onClick={this.removeClassFromStack}
          >
            <IoChevronBackOutline />
            Back
          </button>
          <h1 className="font-black lg:text-xl xl:text-2xl m-3 mb-0">
            {item.college + " " + item.department + " " + item.number}
          </h1>
          <h2 className="text-lg mx-3">{item.title}</h2>
          <div className="text-gray-700 p-3">
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 border inline-block border-solid border-blue-500 rounded-full px-2 bg-blue-100 hover:bg-blue-200 mt-1 text-sm"
            >
              <span className="inline align-middle">
                View on Nexus Course Review
              </span>
              <FiExternalLink className="inline align-middle ml-1" />
            </a>
            {hubs.length > 0 && (
              <div className="flex flex-wrap text-sm mt-4 gap-1">
                <p>Hub Areas:</p>
                {hubs.map((thisItem, key) => {
                  return (
                    <div className="bg-gray-200 rounded-full px-2" key={key}>
                      {thisItem}
                    </div>
                  );
                })}
              </div>
            )}
            {item.prereqs !== "" && (
              <div className="mt-4 text-sm">
                <p className="inline">Prerequisites:</p>
                {item.prereqs.split(",").map((thisItem, key) => {
                  return (
                    <>
                      <button
                        className="inline text-blue-500 font-bold ml-1"
                        onClick={() => this.addClassToStack(thisItem)}
                        key={key}
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
            <p className="text-sm mt-4">
              {formatDescription(item.description)}
            </p>
          </div>
        </div>
        <div className="flex flex-col h-1/2">
          <div className="uppercase text-gray-700 font-black flex justify-between w-full px-3">
            <span className="w-3/5">section</span>
            <div className="w-2/5">
              <span className="w-2/3">prof/work</span>
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto overflow-x-hidden w-full">
            {this.state.sections.map((item, key) => {
              return <SectionItem item={item} key={key} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassCard);

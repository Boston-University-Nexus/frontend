import React, { Component } from "react";
import config from "../../../config";

// Icons
import { FiExternalLink } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

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
        <button className="text-blue-500 font-bold cursor-pointer hover:text-blue-600 transition-colors inline">
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
    let url = "hubs?course_code=" + current.course_code;

    // Get all hubs
    axios.get(config["server"] + url).then(
      function (response) {
        let arr = [];
        for (const item of response.data) {
          arr.push(item.buhub_name);
        }

        this.setState({ hubs: arr });
      }.bind(this)
    );
  }

  getSections() {
    let current = this.props.item;
    let url = "sections?course_code=" + current.course_code;

    // Get all sections
    axios.get(config["server"] + url).then(
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
      <div className="w-full h-full">
        <div class="p-4">
          <button
            className="flex items-center justify-start text-gray-600 w-full focus:outline-none hover:text-black transition-colors mb-4"
            onClick={this.removeClassFromStack}
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="font-black lg:text-xl xl:text-2xl">
            {item.course_code}
          </h1>
          <h2 className="text-lg mb-1">{item.course_title}</h2>
          <a
            href={"/coursesearch/courses?course=" + item.course_code}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 border inline-block border-solid border-blue-500 rounded-full px-3 py-1 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 hover:border-blue-600 transition-colors mt-1 text-sm"
          >
            <span className="inline align-middle">
              View on Nexus Course Review
            </span>
            <FiExternalLink className="inline align-middle ml-1" />
          </a>
        </div>
        <div
          className="flex w-full h-full items-start justify-start flex-col overflow-y-scroll"
          style={{ height: "calc(100% - 228px)" }}
        >
          <div className="text-gray-600 px-4 pb-4">
            {hubs.length > 0 && (
              <div className="flex flex-wrap items-center text-sm gap-2">
                <p>Hub Areas:</p>
                {hubs.map((thisItem, key) => {
                  return (
                    <div
                      className="bg-gray-200 rounded-full px-3 py-1"
                      key={key}
                    >
                      {thisItem}
                    </div>
                  );
                })}
              </div>
            )}
            {item.course_prereqs !== "" && (
              <div className="mt-4 text-sm">
                <p className="inline">Prerequisites:</p>
                {item.course_prereqs.split("&").map((thisItem, key) => {
                  return (
                    <>
                      <button
                        className="inline text-blue-500 hover:text-blue-600 transition-colors font-bold ml-1"
                        onClick={() => this.addClassToStack(thisItem)}
                        key={key}
                      >
                        {thisItem}
                      </button>
                      {key < item.course_prereqs.split(",").length - 1
                        ? ", "
                        : ""}
                    </>
                  );
                })}
                ; or equivalent.
              </div>
            )}
            <p className="text-sm mt-4">
              {formatDescription(item.course_description)}
            </p>
          </div>

          <div className="flex flex-col w-full">
            <div className="uppercase text-gray-600 font-black flex justify-between w-full px-4">
              <span className="w-1/3">section</span>
              <div className="w-1/3">
                <span>prof/work</span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              {this.state.sections.map((item, key) => {
                return <SectionItem item={item} key={key} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassCard);
